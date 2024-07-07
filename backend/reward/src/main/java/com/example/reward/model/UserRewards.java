package com.example.reward.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class UserRewards {
   @Id
    private String id;
    private String username;
    private List<Reward> rewards;


    public void addReward(Reward reward) {

        rewards.add(reward);
    }
}
