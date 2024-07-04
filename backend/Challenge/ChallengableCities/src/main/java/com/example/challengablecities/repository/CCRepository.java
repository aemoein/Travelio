package com.example.challengablecities.repository;

import com.example.challengablecities.model.ChallengableCity;
import com.example.challengablecities.model.ChallengeType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface CCRepository extends MongoRepository<ChallengableCity, String> {

    @Query("{'challengeType' : 'DARE'}")
    List<ChallengableCity> findAlldares();

    @Query("{'challengeType' : 'PHOTO'}")
    List<ChallengableCity> findAllphotos();

    @Query("{'challengeType' : 'HUNTMAN'}")
    List<ChallengableCity> findAllpuzzles();


    @Query("{ 'city': ?0, 'challengeType': ?1 }")
    boolean existsByCityAndChallengeType(String city, ChallengeType challengeType);
}
