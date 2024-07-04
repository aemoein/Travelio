package com.example.notification.controller;

import com.example.notification.service.NotificationService;
import com.example.notification.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userId}")
    public List<Notification> getNotificationsByUserId(@PathVariable String userId) {
        return notificationService.getNotificationsByUserId(userId);
    }

    @PostMapping("/reward")
    public Notification sendRNotification(@RequestParam String name,@RequestParam String userName) {
        return notificationService.sendRNotification(name, userName); //Loclahost:8080/api/notifications/reward?name=rewardname&userName=tina
    }

    @PostMapping("/achievement")
    public Notification sendANotification(@RequestParam String name,@RequestParam String userName) {
        return notificationService.sendANotification(name, userName); //Loclahost:8080/api/notifications/reward?name=rewardname&userName=tina
    }

}
