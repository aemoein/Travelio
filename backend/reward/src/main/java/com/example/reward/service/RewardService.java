package com.example.reward.service;

import com.example.reward.model.RewardType;
import com.example.reward.model.UserRewards;
import com.example.reward.repository.RewardRepository;
import com.example.reward.model.Reward;
import com.example.reward.repository.UserRewardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;
import java.util.UUID;


@Service
public class RewardService {
    @Autowired
    private RewardRepository rewardRepository;
    @Autowired
    private UserRewardRepo userRewardRepo;

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


    public Reward redeemReward(int userPoints, String rewardId, String username) {
        Reward reward = rewardRepository.findById(rewardId).orElse(null);
        UserRewards userRewards = userRewardRepo.findByUsername(username);

        if (userRewards == null) {
            throw new RuntimeException("User not found");
        }

        if (reward != null) {
            if (userPoints >= reward.getUserPoints()) {
                // Check if the reward is already present for the user
                boolean alreadyHasReward = userRewards.getRewards().stream()
                        .anyMatch(r -> r.getId().equals(reward.getId()));

                if (!alreadyHasReward) {
                    userRewards.addReward(reward);
                    userRewardRepo.save(userRewards);
                    return reward;
                } else {
                    throw new RuntimeException("Reward is already redeemed by the user");
                }
            } else {
                throw new RuntimeException("Insufficient points to redeem this reward");
            }
        } else {
            throw new RuntimeException("Reward not found");
        }
    }


    @Transactional
    public Reward redeemRewardByChallengePoints(int challengePoints, String rewardId, String username) {
        Reward reward = rewardRepository.findById(rewardId).orElse(null);
        if (reward != null) {
            if (challengePoints >= reward.getChallengePoints()) {
                UserRewards userRewards = userRewardRepo.findByUsername(username);
                if (userRewards == null) {
                    userRewards = new UserRewards();
                    userRewards.setUsername(username);
                    userRewards.setRewards(new ArrayList<>());
                }
                userRewards.addReward(reward);
                userRewardRepo.save(userRewards);
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

    public List<Reward> getMyRewards(String username) {
        UserRewards ur = userRewardRepo.findByUsername(username);
        if (ur != null) {
            if(ur.getRewards() != null){
                return ur.getRewards();
            }
            else {
                return null;
            }
        }
        throw new RuntimeException("User or reward not found");
    }

    public String provideProfileReward(String username) {
        UserRewards ur = userRewardRepo.findByUsername(username);
        if (ur != null) {
            throw new RuntimeException("User already Exists!");
        }
        ur = new UserRewards();
        ur.setUsername(username);
        ur.setId(UUID.randomUUID().toString());
        ur.setRewards(new ArrayList<>());
        userRewardRepo.save(ur);
        return ur.getId();
    }
}
