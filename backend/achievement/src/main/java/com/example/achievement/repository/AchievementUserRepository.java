package com.example.achievement.repository;

import com.example.achievement.model.AchievmentForUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface AchievementUserRepository extends MongoRepository<AchievmentForUser, String> {

    @Query("{'userName': ?0}")
    AchievmentForUser findByUserName( String userName );
}
