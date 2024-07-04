package com.example.achievement.service;

import com.example.achievement.model.Achievement;
import com.example.achievement.repository.AchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AchievementService {
    @Autowired
    private AchievementRepository achievementRepository;

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

    public Achievement unlockAchievement(String userId, Achievement achievement) {

        return achievement;
    }
}
