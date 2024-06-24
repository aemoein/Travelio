package com.example.challenge.repository;


import com.example.challenge.entity.Challenge;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ChallengeRepository extends MongoRepository<Challenge, String> {

    @Query("{ 'type' : 'HUNTMAN' }")
    List<Challenge> findHuntmanChallenges();
}
