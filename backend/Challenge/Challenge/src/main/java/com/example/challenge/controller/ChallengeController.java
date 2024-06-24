package com.example.challenge.controller;

import com.example.challenge.entity.Challenge;
import com.example.challenge.service.ChallengeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Challenge")
@AllArgsConstructor
public class ChallengeController {
    ChallengeService challengeService;

    @GetMapping("/huntmanpuzzile")
    public Challenge huntmanPuzzile(@RequestParam String city) {
        return challengeService.getHuntmanPuzzile(city);
    }

    @GetMapping("/photochallenge")
    public List<Challenge> photoChallenge() {
        return challengeService.getPhotoChallenge();
    }

    @GetMapping("/darechallenge")
    public String dareChallenge() {
        return "Dare Challenge";
    }

    @PostMapping("/new")
    public String postNewChallenge(@RequestBody Challenge challenge) {
        challengeService.postNewChallenge(challenge);
        return "New Challenge Added";
    }



}
