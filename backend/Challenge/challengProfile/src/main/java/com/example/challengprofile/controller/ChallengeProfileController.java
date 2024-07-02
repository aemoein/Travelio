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

}
