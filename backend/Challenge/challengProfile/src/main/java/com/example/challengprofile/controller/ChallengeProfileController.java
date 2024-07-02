package com.example.challengprofile.controller;

import com.example.challengprofile.model.ChallengeProfile;
import com.example.challengprofile.service.ChallengeProfileService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/challengeProfile")
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeProfileController {
    private final ChallengeProfileService challengeProfileService;

    @GetMapping("/getall")
    public List<ChallengeProfile> getAllChallengeProfiles() {
        return challengeProfileService.getAllChallengeProfiles();
    }

    @GetMapping("/getprofile")
    public ChallengeProfile getChallengeProfileByUser(@RequestParam String username) {
        return challengeProfileService.getChallengeProfileByUser(username);
    }

    @PostMapping("/new")
    public String newChallengeProfile(@RequestParam String username) {
         challengeProfileService.newChallengeProfile(username);
        return "Challenge profile created";
    }

    @DeleteMapping("/delete")
    public String deleteChallengeProfile(@RequestParam String username) {
        challengeProfileService.deleteChallengeProfile(username);
        return "Challenge profile deleted";
    }

    @PutMapping("/points")
    public String addChallengeProfilePoints(@RequestParam String username, @RequestParam int points) {
        challengeProfileService.addChallengeProfilePoints(username, points);
        return "Challenge profile updated";
    }

    @PutMapping("/change/points")
    public String removeChallengeProfilePoints(@RequestParam String username, @RequestParam int points) {
        challengeProfileService.removeChallengeProfilePoints(username, points);
        return "Challenge profile updated";
    }


    @PutMapping("/titles")
    public String addChallengeProfileTitle(@RequestParam String username, @RequestParam String title) {
        challengeProfileService.addChallengeProfileTitle(username, title);
        return "Challenge profile title updated";
    }


    @PutMapping("/solved")
    public String addChallengeProfileSolved(@RequestParam String username) {
        challengeProfileService.addChallengeProfileSolved(username);
        return "Challwhenge profile has solved a new challenge";
    }

    @GetMapping("/image/{rank}")
    public ResponseEntity<Resource> getImage(@PathVariable String rank) {
        return challengeProfileService.getImage(rank);
    }
}
