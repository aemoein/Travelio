package com.example.reward.controller;

import com.example.reward.model.Reward;
import com.example.reward.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.time.LocalDate;


@RestController
@RequestMapping("/api/rewards")
public class RewardController {
    @Autowired
    private RewardService rewardService;

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardService.getAllRewards();
    }

    @GetMapping("/user/{username}")
    public List<Reward> getMyRewards(@PathVariable String username) {
        return rewardService.getMyRewards(username);
    }

    @PostMapping
    public void addReward(@RequestBody Reward reward) {
        rewardService.createReward(reward);
    }

    @PostMapping("/redeem/{rewardId}")
    public Reward redeemReward(@PathVariable String rewardId, @RequestParam int points) {
        try {
            return rewardService.redeemReward(points, rewardId);
        }catch (RuntimeException e) {
            throw new RuntimeException("Failed to redeem reward: " + e.getMessage(), e);
        }
    }

    @PutMapping("/redeem/challenge/{rewardId}")
    public Reward redeemRewardByChallengePoints(@PathVariable String rewardId,
                                                @RequestParam int challengePoints,
                                                @RequestParam String username) {
        try {
            return rewardService.redeemRewardByChallengePoints(challengePoints, rewardId, username);
        } catch (RuntimeException e) {
            throw new RuntimeException("Failed to redeem reward: " + e.getMessage(), e);
        }
    }

    @PostMapping("/birthday-reward")
    public Reward provideBirthdayReward(@RequestParam String userId, @RequestParam String birthDate) {
        LocalDate dateOfBirth = LocalDate.parse(birthDate);
        Reward reward = rewardService.provideBirthdayReward(userId, dateOfBirth);
        if (reward != null) {
            return reward;
        } else {
            throw new RuntimeException("Today is not the user's birthday or user not found.");
        }
    }

    @PostMapping("/profile/{username}")
    public String provideProfileReward(@PathVariable String username) {
        return rewardService.provideProfileReward(username);
    }


}
