package com.example.challengablecities.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class ChallengableCity {
    @Id
    private String id;
    private String city;
    private String photoLink;
    private ChallengeType challengeType;
}
