package com.example.challengprofile.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class ChallengeProfile {
    @Id
    private String id;
    @Indexed(unique = true)
    private String userName;
    private Rank rank;
    private int points;
    private String image;
    private List<String> Titles;
    private int numberOfSolvedChallenges;
}
