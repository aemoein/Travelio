package com.example.challenge.service;

import com.example.challenge.entity.Challenge;
import com.example.challenge.repository.ChallengeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private List<Challenge> Huntmanchallenges = null;
    private static final Random random = new Random();

    public void postNewChallenge(Challenge challenge) {
        challengeRepository.insert(challenge);
    }


    public List getPhotoChallenge() {
      return null;
    }

    public void getHuntmanPuzziles(String City) {
       Huntmanchallenges = challengeRepository.findHuntmanChallenges();
    }


    public Challenge getHuntmanPuzzile(String city) {
        getHuntmanPuzziles(city);

        if (Huntmanchallenges == null || Huntmanchallenges.isEmpty()) {
            throw new IllegalStateException("Huntman challenges list is empty or not initialized.");
        }

        int randomIndex = random.nextInt(Huntmanchallenges.size());
        return Huntmanchallenges.get(randomIndex);
    }
}
