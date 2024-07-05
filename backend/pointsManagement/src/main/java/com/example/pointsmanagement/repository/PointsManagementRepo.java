package com.example.pointsmanagement.repository;

import com.example.pointsmanagement.model.PointsManagement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PointsManagementRepo extends MongoRepository<PointsManagement, String> {
        PointsManagement findByUsername(String username);
}
