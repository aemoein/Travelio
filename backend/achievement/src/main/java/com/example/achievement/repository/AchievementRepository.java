package com.example.achievement.repository;

import com.example.achievement.model.Achievement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AchievementRepository extends MongoRepository<Achievement, String> {

    @Query("{'category': ?0}")
    List<Achievement> findByCategory(String category);

    @Query("{'difficulty': ?0}")
    List<Achievement> findByDifficulty(String difficulty);

    @Query("{'type': ?0}")
    List<Achievement> findByType(String type);
}

