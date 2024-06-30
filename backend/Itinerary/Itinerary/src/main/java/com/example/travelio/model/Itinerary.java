package com.example.travelio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "itineraries")
public class Itinerary {
    @Id
    private String id;
    private Long userId;
    private int days;
    private BigDecimal budget;
//    @CreatedDate
//    private LocalDateTime createdAt;
//    @LastModifiedDate
//    private LocalDateTime updatedAt;
    private List<ItineraryItem> items = new ArrayList<>();

    public Itinerary() {
    }

    public Itinerary(String id, Long userId, int days, BigDecimal budget, LocalDateTime createdAt, LocalDateTime updatedAt, List<ItineraryItem> items) {
        this.id = id;
        this.userId = userId;
        this.days = days;
        this.budget = budget;
        this.items = items;
    }

    public String getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public int getDays() {
        return days;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public List<ItineraryItem> getItems() {
        return items;
    }

    public void setItems(List<ItineraryItem> items) {
        this.items = items;
    }

    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setId(String id) {
        this.id = id;
    }
}
