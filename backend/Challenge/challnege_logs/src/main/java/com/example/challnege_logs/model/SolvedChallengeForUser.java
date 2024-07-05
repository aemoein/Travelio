package com.example.challnege_logs.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Document
@Data
public class SolvedChallengeForUser {
    @Id
    private String id;
    private String challengeId;
    private String userName;
    private LocalDateTime solvedAt;

}