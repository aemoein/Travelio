package com.example.challengablecities.controller;

import com.example.challengablecities.model.ChallengableCity;
import com.example.challengablecities.service.CCservice;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/cc")
@CrossOrigin(origins = "http://localhost:3000")
public class CCController {

    CCservice ccService;

   @GetMapping
   public List<ChallengableCity> getAllCities() {
       return ccService.getAllCities();
   }

    @GetMapping("/dare")
    public List<ChallengableCity> getAllCCdare() {
        return ccService.getAllCCdare();
    }

    @GetMapping("/photo")
    public List<ChallengableCity> getAllCCphoto(){
        return ccService.getAllCCphoto();
    }

    @GetMapping("/puzzle")
    public List<ChallengableCity> getAllCChuntman(){
        return ccService.getAllCCPuzzles();
    }

    @PostMapping("/new")
    public ChallengableCity newCC(@RequestBody ChallengableCity cc){
        return ccService.newCC(cc);
    }

    @PutMapping("/edit")
    public String editCC(@RequestBody ChallengableCity cc){
        return ccService.editCC(cc);
    }

    @DeleteMapping("/delete")
    public String deleteCC(@RequestBody String cc){
        return ccService.deletCC(cc);
    }

}
