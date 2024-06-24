package com.example.challenge.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    String target;
    long nextChallengedur;
    int multiplier;

    // Constructor without id
    public Challenge(String title, String description, int points, ChallengeType type, String target,
                     long nextChallengedur, int multiplier) {
        this.title = title;
        this.description = description;
        this.points = points;
        this.type = type;
        this.target = target;
        this.nextChallengedur = nextChallengedur;
        this.multiplier = multiplier;
    }

}
