package com.example.challnege_logs.controller;

import com.example.challnege_logs.model.SolvedChallengeForUser;
import com.example.challnege_logs.service.SCFUservice;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/logs")
public class SCFUcontroller {

    private final SCFUservice scfUservice;

    @PostMapping("/record/{username}/{challengeid}")
    public String record(@PathVariable String username, @PathVariable String challengeid) {
        return scfUservice.recordSolvedChallenge(challengeid,username);
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

}
