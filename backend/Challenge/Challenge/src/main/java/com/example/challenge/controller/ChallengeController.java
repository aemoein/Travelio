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

    //puzzle is the same for both since its all about general information
    @GetMapping("/local/huntmanpuzzile")
    public Challenge localHuntmanPuzzile(@RequestParam String city) {
        return challengeService.getHuntmanPuzzile(city);
    }

    //locals
    @GetMapping("/local/photochallenge")
    public Challenge localHhotoChallenge(@RequestParam String city) {
        return challengeService.getLocalPhotoChallenge(city);
    }

    @GetMapping("/local/darechallenge")
    public Challenge localDareChallenge(@RequestParam String city) {
        return challengeService.getLocalDareChallenge(city);
    }

    //globals
    @GetMapping("/global/photochallenge")
    public Challenge globalHhotoChallenge(@RequestParam String city) {
        return challengeService.getGlobalPhotoChallenge(city);
    }

    @GetMapping("/global/darechallenge")
    public Challenge globalDareChallenge(@RequestParam String city) {
        return challengeService.getGlobalDareChallenge(city);
    }


    @PostMapping("/new")
    public String postNewChallenge(@RequestBody Challenge challenge) {
        challengeService.postNewChallenge(challenge);
        return "New Challenge Added";
    }

    @DeleteMapping("/delete")
    public String deleteChallenge(@RequestParam String id) {
        return challengeService.deleteChallenge(id);
    }

}
