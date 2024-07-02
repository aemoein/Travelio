package com.example.challengprofile.service;

import com.example.challengprofile.model.ChallengeProfile;
import com.example.challengprofile.model.Rank;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class NewProfile implements ChallengeProfileBuilder{
    private ChallengeProfile profile;
    private String username;

    public NewProfile( String username) {
       this.profile = new ChallengeProfile();
       this.username = username;
    }

    public void setId(){
        profile.setId(generateUniqueID());
    }

    public void setUserName (String userName){
        profile.setUserName(userName);
    }
    public void setRank (){
        profile.setRank(Rank.BEGGINER);
    }
    public void setPoints (){
        //you will start with 50 points as a reward
        profile.setPoints(50);
    }
    public void setTitles (){
        profile.setTitles(null);

    }
    public void setNumberOfSolvedChallenges (){
        profile.setNumberOfSolvedChallenges(0);
    }

    public ChallengeProfile getProfile(){
        setId();
        setUserName(username);
        setRank();
        setPoints();
        setTitles();
        setNumberOfSolvedChallenges();
        return profile;
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

}
