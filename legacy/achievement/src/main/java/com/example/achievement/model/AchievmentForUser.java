package com.example.achievement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class AchievmentForUser {
    @Id
    private String Id;
    @Indexed(unique = true)
    private String userName;
    private List<Achievement> achievement;

    public void addAchievements(Achievement achievement){
        this.achievement .add(achievement);
    }

}
