package com.example.reward.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "rewards")
public class Reward {
    @Id
    private String id;
    private String name;
    private String description;
    private int userPoints; //from achievements
    private int challengePoints;
    private RewardType type; //discount, promotional code
    private String redemptionCriteria; // Terms and conditions

    public Reward() {
    }

    public Reward(String id, String name, String description, int pointsRequired, RewardType type, String redemptionCriteria) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.userPoints = pointsRequired;
        this.type = type;
        this.redemptionCriteria = redemptionCriteria;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getUserPoints() {
        return userPoints;
    }

    public void setUserPoints(int userPoints) {
        this.userPoints = userPoints;
    }

    public int getChallengePoints() {
        return challengePoints;
    }

    public void setChallengePoints(int challengePoints) {
        this.challengePoints = challengePoints;
    }

    public RewardType getType() {
        return type;
    }

    public void setType(RewardType type) {
        this.type = type;
    }

    public String getRedemptionCriteria() {
        return redemptionCriteria;
    }

    public void setRedemptionCriteria(String redemptionCriteria) {
        this.redemptionCriteria = redemptionCriteria;
    }

}
