package com.example.pointsmanagement.service;

import com.example.pointsmanagement.model.PointsManagement;
import com.example.pointsmanagement.repository.PointsManagementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PointsManagementService {

    @Autowired
    private PointsManagementRepo pointsManagementRepository;

    public List<PointsManagement> getAllPoints() {
        return pointsManagementRepository.findAll();
    }

    public PointsManagement getPointsById(String id) {
        return pointsManagementRepository.findById(id).orElse(null);
    }

    public PointsManagement createPoints(PointsManagement pointsManagement) {
        return pointsManagementRepository.save(pointsManagement);
    }

    public PointsManagement updatePoints(String id, PointsManagement pointsManagement) {
        pointsManagement.setId(id);
        return pointsManagementRepository.save(pointsManagement);
    }

    public void deletePoints(String id) {
        pointsManagementRepository.deleteById(id);
    }

    public LocalDate getDateOfBirth(String id) {
        PointsManagement pointsManagement = pointsManagementRepository.findById(id).orElse(null);
        if (pointsManagement != null) {
            return pointsManagement.getDateOfBirth();
        }
        return null;
    }

}
