package com.example.challengablecities.service;

import com.example.challengablecities.model.ChallengableCity;
import com.example.challengablecities.repository.CCRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CCservice {
    private CCRepository ccRepository;


    public List<ChallengableCity> getAllCities() {
        List<ChallengableCity> cities = ccRepository.findAll();
        if (cities.isEmpty()) {
            throw new EmptyResultDataAccessException(1);
        }
        return cities;
    }


    public List<ChallengableCity> getAllCCdare() {
        List<ChallengableCity> cities = ccRepository.findAlldares();
        if (cities.isEmpty()) {
            throw new EmptyResultDataAccessException(1);
        }
        return cities;
    }

    public List<ChallengableCity> getAllCCphoto() {
        List<ChallengableCity> cities = ccRepository.findAllphotos();
        if (cities.isEmpty()) {
            throw new EmptyResultDataAccessException(1);
        }
        return cities;
    }

    public List<ChallengableCity> getAllCCPuzzles() {
        List<ChallengableCity> cities = ccRepository.findAllpuzzles();
        if (cities.isEmpty()) {
            throw new EmptyResultDataAccessException(1);
        }
        return cities;
    }


    public ChallengableCity newCC(ChallengableCity cc) {
        List<ChallengableCity> exists = ccRepository.existsByCityAndChallengeType(cc.getCity(), cc.getChallengeType());
        if (exists.isEmpty()) {
            String uuid = UUID.randomUUID().toString();
            cc.setId(uuid);
            return ccRepository.save(cc);
        }
        return cc; // or throw an exception if you prefer

    }

    @Transactional
    public String editCC(ChallengableCity cc) {
        ChallengableCity oldCC = ccRepository.findById(cc.getId()).orElse(null);
        if (oldCC == null) {
            throw new EmptyResultDataAccessException(1);
        }
        oldCC.setCity(cc.getCity());
        oldCC.setChallengeType(cc.getChallengeType());
        oldCC.setPhotoLink(cc.getPhotoLink());
        return ccRepository.save(oldCC).toString();
    }


    public String deletCC(String id) {
        ChallengableCity oldCC = ccRepository.findById(id).orElse(null);
        if (oldCC == null) {
            throw new EmptyResultDataAccessException(1);
        }
        ccRepository.delete(oldCC);
        return "deleted successfuly";
    }
}
