package com.example.travelio.model;

import java.math.BigDecimal;

public class ItineraryItem {
    private String type;
    private String name;
    private String description;
    private String timing;
    private String location;
    private BigDecimal cost;

    public ItineraryItem() {
    }

    public ItineraryItem(String name, String type, String description, String location, String timing, BigDecimal cost) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.location = location;
        this.timing = timing;
        this.cost = cost;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getTiming() {
        return timing;
    }

    public String getLocation() {
        return location;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setTiming(String timing) {
        this.timing = timing;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }
}
