package com.example.challenge.repository;


import com.example.challenge.entity.Challenge;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ChallengeRepository extends MongoRepository<Challenge, String> {

    @Query("{ 'type' : 'HUNTMAN', 'city':?0 }")
    List<Challenge> findHuntmanChallenges(String city);

    @Query("{'type' :  'PHOTO','locationType': 'LOCAL' , 'city' :  ?0}")
    List<Challenge> findLPhotoChallenges(String city);

    @Query("{'type' :  'PHOTO','locationType': 'GLOBAL' , 'city' :  ?0}")
    List<Challenge> findGPhotoChallenges(String city);

    @Query("{ 'type' : 'DARE','locationType': 'LOCAL' , 'city' : ?0 }")
    List<Challenge> findLDareChallenges(String city);

    @Query("{ 'type' : 'DARE','locationType': 'GLOBAL' , 'city' : ?0 }")
    List<Challenge> findGDareChallenges(String city);
}
