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
    private List<Challenge> huntmanChallenges = null,
            photoChallenges = null,
            dareChallenges = null;
    private static final Random random = new Random();

    public void postNewChallenge(Challenge challenge) {
        System.out.println(challenge.getId());
        if (challengeRepository.existsById(challenge.getId())) {
            challengeRepository.save(challenge);
        }
        else {
            challengeRepository.insert(challenge);
        }
    }



    /**
     * here be the get random Dare
     * looks like you need to implement a strategy pattern here
     *
     * */

    public void getDareChallenges(String city) {
        dareChallenges = challengeRepository.findDareChallenges(city);
    }

    public Challenge getDareChallenge(String city) {
        getDareChallenges(city);
        if (dareChallenges == null || dareChallenges.isEmpty()) {
            throw new IllegalStateException("Dare challenges are empty");
        }
        int index = random.nextInt(dareChallenges.size());
        return dareChallenges.get(index);
    }


    /**
     * here be the get random photo
     * looks like you need to implement a strategy pattern here
     *
     * */

    public void getPhotoChallenges(String city) {
        photoChallenges = challengeRepository.findPhotoChallenges(city);
    }

    public Challenge getPhotoChallenge(String city) {
         getPhotoChallenges(city);
         if(photoChallenges == null || photoChallenges.isEmpty()){
             throw new IllegalStateException("Photo challenge not found");
         }
         int index = random.nextInt(photoChallenges.size());
         return photoChallenges.get(index);
    }

    /**
     * here be the get random huntman
     * looks like you need to implement a strategy pattern here
     *
    * */
    public void getHuntmanPuzziles(String city) {
       huntmanChallenges = challengeRepository.findHuntmanChallenges(city);
    }

    public Challenge getHuntmanPuzzile(String city) {
        getHuntmanPuzziles(city);

        if (huntmanChallenges == null || huntmanChallenges.isEmpty()) {
            throw new IllegalStateException("Huntman challenges list is empty or not initialized.");
        }

        int randomIndex = random.nextInt(huntmanChallenges.size());
        return huntmanChallenges.get(randomIndex);
    }
}
