package com.example.challenge.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Challenge {
    @Id
    String id;
    String title;
    String description;
    int points;
    ChallengeType type;
    List<String> tasks;
    List<String> targets;
    long nextChallengedur;
    int multiplier;
    String city;
    int attempts;
    //jason object

    // Constructor without id
    public Challenge(String title, String description, int points, ChallengeType type, List<String>tasks,List<String> targets,
                     long nextChallengedur, int multiplier, String city, int attempts) {
        this.title = title;
        this.description = description;
        this.points = points;
        this.type = type;
        this.targets = targets;
        this.nextChallengedur = nextChallengedur;
        this.multiplier = multiplier;
        this.city = city;
        this.attempts = attempts;
        this.tasks = tasks;
    }

}
