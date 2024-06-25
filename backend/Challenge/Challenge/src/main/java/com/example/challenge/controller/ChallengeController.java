package com.example.challenge.controller;

import com.example.challenge.entity.Challenge;
import com.example.challenge.service.ChallengeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Challenge")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeController {
    ChallengeService challengeService;

    @GetMapping("/huntmanpuzzile")
    public Challenge huntmanPuzzile(@RequestParam String city) {
        return challengeService.getHuntmanPuzzile(city);
    }

    @GetMapping("/photochallenge")
    public Challenge photoChallenge(@RequestParam String city) {
        return challengeService.getPhotoChallenge(city);
    }

    @GetMapping("/darechallenge")
    public Challenge dareChallenge(@RequestParam String city) {
        return challengeService.getDareChallenge(city);
    }

    @PostMapping("/new")
    public String postNewChallenge(@RequestBody Challenge challenge) {
        challengeService.postNewChallenge(challenge);
        return "New Challenge Added";
    }



}
