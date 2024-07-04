package com.example.challenge.service;

import com.example.challenge.entity.Challenge;
import com.example.challenge.repository.ChallengeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private List<Challenge> huntmanChallenges = null,
            photoChallenges = null,
            dareChallenges = null;
    private static final Random random = new Random();

    public void postNewChallenge(Challenge challenge) {
        //System.out.println(challenge.getId());
        if (challenge.getId() == null){
            String uuid = UUID.randomUUID().toString();
            challenge.setId(uuid);
        }
        if (challengeRepository.existsById(challenge.getId())) {
            challengeRepository.save(challenge);
        }
        else {
            challengeRepository.insert(challenge);
        }
    }

    public static String generateUniqueID() {
        // Get the current timestamp
        long timestamp = System.currentTimeMillis();

        // Format the timestamp to a readable date format
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String formattedDate = sdf.format(new Date(timestamp));

        // Generate a random UUID
        String randomUUID = UUID.randomUUID().toString();

        // Combine the formatted date and random UUID
        String uniqueID = formattedDate + "-" + randomUUID;

        return uniqueID;
    }



    /**
     * here be the get random Dare
     * looks like you need to implement a pattern here
     *
     * */

    public void getDareChallenges(String city) {
        dareChallenges = challengeRepository.findGDareChallenges(city);
    }

    public Challenge getLocalDareChallenge(String city) {
        getDareChallenges(city);
        if (dareChallenges == null || dareChallenges.isEmpty()) {
            throw new IllegalStateException("Dare challenges are empty");
        }
        int index = random.nextInt(dareChallenges.size());
        return dareChallenges.get(index);
    }


    public void getPhotoChallenges(String city) {
        photoChallenges = challengeRepository.findGPhotoChallenges(city);
    }

    public Challenge getLocalPhotoChallenge(String city) {
         getPhotoChallenges(city);
         if(photoChallenges == null || photoChallenges.isEmpty()){
             throw new IllegalStateException("Photo challenge not found");
         }
         int index = random.nextInt(photoChallenges.size());
         return photoChallenges.get(index);
    }


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


    public void getGPhotoChallenges(String city) {
        photoChallenges = challengeRepository.findGPhotoChallenges(city);
    }

    public Challenge getGlobalPhotoChallenge(String city) {
        getGPhotoChallenges(city);
        if(photoChallenges == null || photoChallenges.isEmpty()){
            throw new IllegalStateException("Photo challenges list is empty or not initialized.");
        }
        int index = random.nextInt(photoChallenges.size());
        return photoChallenges.get(index);
    }


    public void getGDareChallenges(String city) {
        dareChallenges = challengeRepository.findGPhotoChallenges(city);
    }

    public Challenge getGlobalDareChallenge(String city) {
        getGDareChallenges(city);
        if(dareChallenges == null || dareChallenges.isEmpty()){
            throw new IllegalStateException("Dare challenges list is empty or not initialized.");
        }
        int index = random.nextInt(dareChallenges.size());
        return dareChallenges.get(index);
    }

    public String deleteChallenge(String id) {
        if (!challengeRepository.existsById(id)) {
            throw new IllegalStateException("Challenge not found");
        }
        challengeRepository.deleteById(id);
        return "delete: "+ id;
    }
}
