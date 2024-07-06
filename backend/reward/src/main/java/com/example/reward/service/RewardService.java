package com.example.reward.service;

import com.example.reward.model.RewardType;
import com.example.reward.repository.RewardRepository;
import com.example.reward.model.Reward;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDate;


@Service
public class RewardService {
    @Autowired
    private RewardRepository rewardRepository;

    public List<Reward> getAllRewards() {

        return rewardRepository.findAll();
    }

    public Reward getRewardById(String id) {
        return rewardRepository.findById(id).orElse(null);
    }

    public Reward createReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    public Reward updateReward(String id, Reward reward) {
        reward.setId(id);
        return rewardRepository.save(reward);
    }

    public void deleteReward(String id) {

        rewardRepository.deleteById(id);
    }


    public Reward redeemReward(int userPoints, String rewardId) {

        Reward reward = rewardRepository.findById(rewardId).orElse(null);

        if (reward != null) {
            if (userPoints >= reward.getUserPoints()) {
                return reward;
            } else {
                throw new RuntimeException("Insufficient points to redeem this reward");
            }
        } else {
            throw new RuntimeException("User or reward not found");
        }
    }

    public Reward redeemRewardByChallengePoints(int challengePoints, String rewardId) {
        Reward reward = rewardRepository.findById(rewardId).orElse(null);

        if (reward != null) {
            if (challengePoints >= reward.getChallengePoints()) {
                return reward;
            } else {
                throw new RuntimeException("Insufficient challenge points to redeem this reward");
            }
        } else {
            throw new RuntimeException("Reward not found");
        }
    }

    public Reward provideBirthdayReward(String userId, LocalDate birthDate) {
        LocalDate today = LocalDate.now();
        if (today.equals(birthDate)) {
            Reward birthdayReward = new Reward();
            birthdayReward.setName("Birthday Special");
            birthdayReward.setDescription("Happy Birthday! Enjoy a special reward.");
            birthdayReward.setUserPoints(0);
            birthdayReward.setChallengePoints(0);
            birthdayReward.setType(RewardType.SPECIAL);
            birthdayReward.setRedemptionCriteria("Valid only on your birthday.");

            return rewardRepository.save(birthdayReward);
        }
        return null;
    }
}
