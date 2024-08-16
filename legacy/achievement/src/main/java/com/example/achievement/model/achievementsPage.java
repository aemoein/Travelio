package com.example.achievement.model;

import java.util.List;

public class achievementsPage {
    private String userName;
    private List<Achievement> achievements;

    public achievementsPage() {
    }

    public achievementsPage(String userName, List<Achievement> achievements) {
        this.userName = userName;
        this.achievements = achievements;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<Achievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(List<Achievement> achievements) {
        this.achievements = achievements;
    }
}

