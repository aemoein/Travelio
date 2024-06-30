package com.example.travelio.dto;

import java.math.BigDecimal;

public class ItineraryRequest {
//    @NotBlank(message = "Destination is required")
    private String destination;

//    @Min(value = 1, message = "Number of days must be at least 1")
    private int days;

//    @NotNull(message = "Budget is required")
    private BigDecimal budget;

    public int getDays() {
        return days;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }

    public void setDays(int days) {
        this.days = days;
    }

}
