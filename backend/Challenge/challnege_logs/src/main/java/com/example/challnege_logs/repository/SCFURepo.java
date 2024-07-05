package com.example.challnege_logs.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.challnege_logs.model.SolvedChallengeForUser;
import org.springframework.data.mongodb.repository.Query;

public interface SCFURepo extends MongoRepository<SolvedChallengeForUser,String>{

    @Query(value = "{ 'userName': ?0, 'challengeId': ?1 }", sort = "{ 'solvedAt': -1 }")
    SolvedChallengeForUser findTopByUserIdAndChallengeIdOrderBySolvedAtDesc(String userId, String challengeId);
}
