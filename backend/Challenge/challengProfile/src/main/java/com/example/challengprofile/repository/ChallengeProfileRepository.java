package com.example.challengprofile.repository;

import com.example.challengprofile.model.ChallengeProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface ChallengeProfileRepository extends MongoRepository<ChallengeProfile, String> {
    @Query("{'userName' : ?0}")
    ChallengeProfile findProfileByUserName(String username);


}
