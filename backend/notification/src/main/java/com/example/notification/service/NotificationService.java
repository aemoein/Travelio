package com.example.notification.service;

import com.example.notification.model.Notification;
import com.example.notification.repository.NotificationRepository;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.net.URI;
import java.util.Objects;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    private JavaMailSender javaMailSender;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Value("${user.service.url}")
    private String userServiceUrl;

    public List<Notification> getNotificationsByUserId(String userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification sendRNotification(String name, String userName) {
        String msg = "congrats! you won a new reward: "+name;
        Notification notification = new Notification(userName, msg);
        Notification savedNotification = notificationRepository.save(notification);

        sendEmailNotification(savedNotification);

        return savedNotification;
    }

    public Notification sendANotification(String name, String userName) {
        String msg = "congrats! you unlocked a new achievement: "+name;
        Notification notification = new Notification(userName, msg);
        Notification savedNotification = notificationRepository.save(notification);

        sendEmailNotification(savedNotification);

        return savedNotification;
    }

    private void sendEmailNotification(@NotNull Notification notification) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(retrieveUserEmail(notification.getUserId()));
            mailMessage.setSubject("New Achievement Unlocked!");
            mailMessage.setText("Congratulations! You have unlocked a new achievement: " + notification.getMessage());

            javaMailSender.send(mailMessage);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }

    @Contract(pure = true)
    private @NotNull String retrieveUserEmail(String userId) {
        URI uri = UriComponentsBuilder.fromUriString(userServiceUrl)
                .path("/api/users/{userId}/email")
                .buildAndExpand(userId)
                .toUri();

        return Objects.requireNonNull(webClientBuilder.build()
                .get()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class)
                .block());  // Blocking call;
    }

}
