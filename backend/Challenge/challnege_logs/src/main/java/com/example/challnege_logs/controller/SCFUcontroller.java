package com.example.challnege_logs.controller;

import com.example.challnege_logs.model.SolvedChallengeForUser;
import com.example.challnege_logs.service.SCFUservice;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@AllArgsConstructor
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:3000")
public class SCFUcontroller {

    private final SCFUservice scfUservice;

    @PostMapping("/record/{username}/{challengeid}/{next}")
    public String record(@PathVariable String username, @PathVariable String challengeid,@PathVariable long next) {
        return scfUservice.recordSolvedChallenge(challengeid,username,next);
    }

    // needs to refine
    @PostMapping("/solve")
    public ResponseEntity<String> solveChallenge(@RequestParam String challengeId, @RequestParam String username, @RequestParam long nextChallengeDurMillis) {
        if (scfUservice.canSolveChallenge(username, challengeId, nextChallengeDurMillis)) {
            //scfUservice.recordSolvedChallenge(challengeId, username);
            return ResponseEntity.ok("Challenge solved!");
        } else {
            return ResponseEntity.status(HttpStatus.TOO_EARLY).body("You need to wait before solving this challenge again.");
        }
    }

    @GetMapping("/nextchallenge")
    public LocalDateTime getNextChallengeTime(@RequestParam String username){
        return scfUservice.getNextChallengeTime(username);
    }


}
