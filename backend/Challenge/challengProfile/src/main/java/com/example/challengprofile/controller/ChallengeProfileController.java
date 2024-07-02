package com.example.challengprofile.controller;

import com.example.challengprofile.model.ChallengeProfile;
import com.example.challengprofile.service.ChallengeProfileService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/challengeProfile")
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
    public String addChallengeProfile(@RequestParam String username, @RequestParam int points) {
        challengeProfileService.addChallengeProfile(username, points);
        return "Challenge profile updated";
    }

    //not complete
    @PutMapping("/titles")
    public String addChallengeProfileTitle(@RequestParam String username, @RequestParam String title) {
        challengeProfileService.addChallengeProfileTitle(username, title);
        return "Challenge profile title updated";
    }

    //number of challenge solved
    @PutMapping("/solved")
    public String addChallengeProfileSolved(@RequestParam String username) {
        challengeProfileService.addChallengeProfileSolved(username);
        return "Challenge profile has solved a new challenge";
    }


}
