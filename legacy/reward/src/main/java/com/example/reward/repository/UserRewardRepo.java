package com.example.reward.repository;

import com.example.reward.model.UserRewards;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRewardRepo extends MongoRepository<UserRewards,String> {

    @Query("{'username': ?0}")
    public UserRewards findByUsername(String username);

}
