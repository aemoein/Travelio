package com.example.challengprofile.service;

import com.example.challengprofile.model.ChallengeProfile;

public interface ChallengeProfileBuilder {
    public void setId();
    public void setUserName (String userName);
    public void setRank ();
    public void setPoints ();
    public void setTitles ();
    public void setNumberOfSolvedChallenges ();
   // public void setImageUrl ();
}
/*
*  @Id
    private String id;
    @Indexed(unique = true)
    private String userName;
    private String rank;
    private int points;
    private String image;
    private List<String> Titles;
    private int numberOfSolvedChallenges;
* */