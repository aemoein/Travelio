package com.example.achievement.controller;

import com.example.achievement.model.Achievement;
import com.example.achievement.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "http://localhost:3000")
public class AchievementController {
    @Autowired
    private AchievementService achievementService;

    @GetMapping
    public List<Achievement> getAllAchievements() {
        return achievementService.getAllAchievements();
    }

    @GetMapping("/{id}")
    public Achievement getAchievementById(@PathVariable String id) {
        return achievementService.getAchievementById(id);
    }

    @GetMapping("/category/{category}")
    public List<Achievement> getAchievementsByCategory(@PathVariable String category) {
        return achievementService.getAchievementsByCategory(category);
    }

    @GetMapping("/difficulty/{difficulty}")
    public List<Achievement> getAchievementsByDifficulty(@PathVariable String difficulty) {
        return achievementService.getAchievementsByDifficulty(difficulty);
    }

    @PostMapping
    public Achievement createAchievement(@RequestBody Achievement achievement) {
        return achievementService.createAchievement(achievement);
    }

    @PutMapping("/{id}")
    public Achievement updateAchievement(@PathVariable String id, @RequestBody Achievement achievement) {
        return achievementService.updateAchievement(id, achievement);
    }

    @DeleteMapping("/{id}")
    public void deleteAchievement(@PathVariable String id) {
        achievementService.deleteAchievement(id);
    }

    @PutMapping("/unlock/{username}/{achievementId}")
    public Achievement unlockAchievement(@PathVariable String username, @PathVariable String achievementId) {
        return achievementService.unlockAchievement(username, achievementId);
    }

    @GetMapping("/user/{username}")
    public List<Achievement> getAchievementsByUserId(@PathVariable String username) {
        return achievementService.getAchievementsByUserId(username);
    }

    @PostMapping("/profile/{username}")
    public String createProfile(@PathVariable String username) {
        return achievementService.createProfile(username);
    }
}
