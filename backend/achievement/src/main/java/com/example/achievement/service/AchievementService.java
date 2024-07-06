package com.example.achievement.service;

import com.example.achievement.model.Achievement;
import com.example.achievement.model.AchievmentForUser;
import com.example.achievement.repository.AchievementRepository;
import com.example.achievement.repository.AchievementUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AchievementService {
    @Autowired
    private AchievementRepository achievementRepository;
    @Autowired
    private AchievementUserRepository achievementUserRepository;

    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }

    public Achievement getAchievementById(String id) {
        return achievementRepository.findById(id).orElse(null);
    }

    public List<Achievement> getAchievementsByCategory(String category) {
        return achievementRepository.findByCategory(category);
    }

    public List<Achievement> getAchievementsByDifficulty(String difficulty) {
        return achievementRepository.findByDifficulty(difficulty);
    }

    public Achievement createAchievement(Achievement achievement) {
        achievement.setActive(true);
        Achievement savedAchievement = achievementRepository.save(achievement);
        return savedAchievement;
    }

    public Achievement updateAchievement(String id, Achievement updatedAchievement) {
        Achievement existingAchievement = achievementRepository.findById(id).orElse(null);
        if (existingAchievement != null) {
            existingAchievement.setName(updatedAchievement.getName());
            existingAchievement.setDescription(updatedAchievement.getDescription());
            existingAchievement.setCategory(updatedAchievement.getCategory());
            existingAchievement.setDifficulty(updatedAchievement.getDifficulty());
            existingAchievement.setPoints(updatedAchievement.getPoints());
            existingAchievement.setActive(true);
            Achievement savedAchievement = achievementRepository.save(existingAchievement);
            return savedAchievement;
        }
        return null; //achievement not found
    }

    public void deleteAchievement(String id) {
        achievementRepository.deleteById(id);
    }

    public Achievement retireAchievement(String id) {
        Achievement achievement = achievementRepository.findById(id).orElse(null);
        if (achievement != null) {
            achievement.setActive(false);
            return achievementRepository.save(achievement);
        }
        return null;
    }

    public Achievement unlockAchievement(String username, String achievementId) {
        AchievmentForUser afu = achievementUserRepository.findByUserName(username);
        if (afu == null) {
            // User not found, handle accordingly (throw exception or return null)
            throw new IllegalArgumentException("User with username " + username + " not found");
        }
        Achievement achievement = achievementRepository.findById(achievementId).orElse(null);
        if (achievement == null) {
            // Achievement not found, handle accordingly (throw exception or return null)
            throw new IllegalArgumentException("Achievement with ID " + achievementId + " not found");
        }

        List<Achievement> achievements = afu.getAchievement();
        if (achievements == null) {
            achievements = new ArrayList<>();
        }
        // Check if the achievement is already unlocked
        if (achievements.stream().anyMatch(a -> a.getId().equals(achievementId))) {
            throw new IllegalStateException("Achievement " + achievementId + " is already unlocked for user " + username);
        }
        achievements.add(achievement);
        afu.setAchievement(achievements);
        achievementUserRepository.save(afu);
        return achievement;
    }

    public List<Achievement> getAchievementsByUserId(String username) {
        AchievmentForUser afu = new AchievmentForUser();
        afu = achievementUserRepository.findByUserName(username);
        if (afu != null) {
            if (afu.getAchievement() != null) {
                return afu.getAchievement();
            }
        }
        return null;
    }

    public String createProfile(String username) {
        AchievmentForUser afu = achievementUserRepository.findByUserName(username);
        if (afu != null) {
            throw new IllegalStateException("Profile already exists");
        }
        else {
           String id = UUID.randomUUID().toString();
           afu = new AchievmentForUser();
           afu.setUserName(username);
           afu.setId(id);
           afu.setAchievement(null);
           achievementUserRepository.save(afu);
           return id;
        }
    }

}
