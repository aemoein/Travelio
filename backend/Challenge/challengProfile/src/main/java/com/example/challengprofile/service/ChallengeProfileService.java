package com.example.challengprofile.service;

import com.example.challengprofile.model.ChallengeProfile;
import com.example.challengprofile.repository.ChallengeProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
}
