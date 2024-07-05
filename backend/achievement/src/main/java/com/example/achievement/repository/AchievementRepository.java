package com.example.achievement.repository;

import com.example.achievement.model.Achievement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AchievementRepository extends MongoRepository<Achievement, String> {
    List<Achievement> findByCategory(String category);
    List<Achievement> findByDifficulty(String difficulty);

    List<Achievement> findByType(String type);
}

