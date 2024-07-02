package com.example.challengprofile.service;

import com.example.challengprofile.model.ChallengeProfile;
import com.example.challengprofile.model.Rank;
import com.example.challengprofile.repository.ChallengeProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ChallengeProfileService {
    private ChallengeProfileRepository challengeProfileRepository;

    public List<ChallengeProfile> getAllChallengeProfiles() {
        return challengeProfileRepository.findAll();
    }

    public ChallengeProfile getChallengeProfileByUser(String username) {
        if(challengeProfileRepository.findProfileByUserName(username) != null) {
            return challengeProfileRepository.findProfileByUserName(username);
        }
        throw new IllegalStateException("No challenge profile found for username " + username);
    }


    public void newChallengeProfile(String username) {
        if(challengeProfileRepository.findProfileByUserName(username) == null) {
            NewProfile profileBuilder = new NewProfile(username);
            ChallengeProfile challengeProfile = profileBuilder.getProfile();
            if(challengeProfile != null) {
                challengeProfileRepository.save(challengeProfile);
            }
            else {
                throw new IllegalStateException("Challenge profile already exists");
            }
        }
        else {
            throw new IllegalStateException("Challenge profile already exists");
        }
    }

    public void deleteChallengeProfile(String username) {
        if(challengeProfileRepository.findProfileByUserName(username) != null) {
            challengeProfileRepository.delete(challengeProfileRepository.findProfileByUserName(username));
        }
        else {
            throw new IllegalStateException("No challenge profile found for username " + username);
        }
    }

    @Transactional
    public void addChallengeProfile(String username, int points) {
        ChallengeProfile challengeProfile = challengeProfileRepository.findProfileByUserName(username);
        if(challengeProfile != null) {
            challengeProfile.setPoints(challengeProfile.getPoints() + points);
            challengeProfileRepository.save(challengeProfile);
        }
        else {
            throw new IllegalStateException("No challenge profile found for username " + username);
        }
    }

    //not complete you have to update the Rank as the titles increases
    @Transactional
    public void addChallengeProfileTitle(String username, String title) {
        ChallengeProfile challengeProfile = challengeProfileRepository.findProfileByUserName(username);
        if(challengeProfile != null) {
            challengeProfile.getTitles().add(title);
            challengeProfileRepository.save(challengeProfile);
        }
        else {
            throw new IllegalStateException("No challenge profile found for username " + username);
        }
    }


}
