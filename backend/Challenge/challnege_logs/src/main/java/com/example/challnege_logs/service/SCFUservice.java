package com.example.challnege_logs.service;

import com.example.challnege_logs.repository.SCFURepo;
import lombok.AllArgsConstructor;
import com.example.challnege_logs.model.SolvedChallengeForUser;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@AllArgsConstructor
@Service
public class SCFUservice {
    private final SCFURepo scfuRepo;

    public String recordSolvedChallenge(String challengeId, String userName) {
        SolvedChallengeForUser solvedChallenge = new SolvedChallengeForUser();
        solvedChallenge.setChallengeId(challengeId);
        solvedChallenge.setUserName(userName);
        LocalDateTime now = LocalDateTime.now();
        solvedChallenge.setSolvedAt(now);
        String uuid = UUID.randomUUID().toString();
        solvedChallenge.setId(uuid);
        scfuRepo.save(solvedChallenge);
        return "challenge with id: "+ challengeId +" is solved by user: "+userName+ " at: "+ now;
    }

    public boolean canSolveChallenge(String userId, String challengeId, long nextChallengeDurMillis) {
        SolvedChallengeForUser lastSolved = scfuRepo.findTopByUserIdAndChallengeIdOrderBySolvedAtDesc(userId, challengeId);
        if (lastSolved == null) {
            return true;
        }
        LocalDateTime lastSolvedTime = lastSolved.getSolvedAt();
        LocalDateTime nextAllowedTime = lastSolvedTime.plus(nextChallengeDurMillis, ChronoUnit.MILLIS);
        return LocalDateTime.now().isAfter(nextAllowedTime);
    }

}
