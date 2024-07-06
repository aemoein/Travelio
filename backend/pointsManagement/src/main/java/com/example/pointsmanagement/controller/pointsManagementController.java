package com.example.pointsmanagement.controller;

import com.example.pointsmanagement.model.PointsManagement;
import com.example.pointsmanagement.service.PointsManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/points-management")
@CrossOrigin(origins = "http://localhost:3000")
public class pointsManagementController {

    @Autowired
    private PointsManagementService pointsManagementService;

    @GetMapping
    public List<PointsManagement> getAllPoints() {
        return pointsManagementService.getAllPoints();
    }

    @GetMapping("/{id}")
    public PointsManagement getPointsById(@PathVariable String id) {
        return pointsManagementService.getPointsById(id);
    }

    @PostMapping
    public PointsManagement createPoints(@RequestBody PointsManagement pointsManagement) {
        return pointsManagementService.createPoints(pointsManagement);
    }

    @PutMapping("/{id}")
    public PointsManagement updatePoints(@PathVariable String id, @RequestBody PointsManagement pointsManagement) {
        return pointsManagementService.updatePoints(id, pointsManagement);
    }

    @DeleteMapping("/{id}")
    public void deletePoints(@PathVariable String id) {
        pointsManagementService.deletePoints(id);
    }

    @GetMapping("/{id}/dateOfBirth")
    public LocalDate getDateOfBirth(@PathVariable String id) {
        return pointsManagementService.getDateOfBirth(id);
    }
}
