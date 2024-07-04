package com.example.achievement.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "achievements")
public class Achievement {
    @Getter
    @Setter
    @Id
    private String id;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String description;
    @Getter
    @Setter
    private String category;
    @Getter
    @Setter
    private String difficulty;
    @Getter
    @Setter
    private int points;
    private boolean isActive;

    public Achievement() {
    }

    public Achievement(String id, String name, String description, String category, String difficulty, int points, boolean isActive) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.difficulty = difficulty;
        this.points = points;
        this.isActive = isActive;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
