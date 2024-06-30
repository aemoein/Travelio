package com.example.travelio.service;

import com.example.travelio.model.Itinerary;
import com.example.travelio.model.ItineraryItem;
import com.example.travelio.repository.ItineraryRepository;
import com.example.travelio.dto.ItineraryRequest;
import com.example.travelio.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItineraryService {
    @Autowired
    private ItineraryRepository itineraryRepository;

    public Itinerary createItinerary(ItineraryRequest request) {
        Itinerary itinerary = new Itinerary();
        itinerary.setDays(request.getDays());
        itinerary.setBudget(request.getBudget());
        return itineraryRepository.save(itinerary);
    }

    public Itinerary customizeItinerary(String id, List<ItineraryItem> items) {
        Itinerary itinerary = itineraryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Itinerary not found"));

        itinerary.setItems(items);
        recalculateCost(itinerary);

        return itineraryRepository.save(itinerary);
    }

    private void recalculateCost(Itinerary itinerary) {
        BigDecimal totalCost = BigDecimal.ZERO;
        for (ItineraryItem item : itinerary.getItems()) {
            totalCost = totalCost.add(item.getCost());
        }
        itinerary.setBudget(totalCost);
    }

    public List<Itinerary> getAllItineraries() {
        return itineraryRepository.findAll();
    }

    public Itinerary getItineraryById(String id) {
        return itineraryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Itinerary not found"));
    }

    public void deleteItinerary(String id) {
        itineraryRepository.deleteById(id);
    }

    public Itinerary generateItinerary(ItineraryRequest request) {
        Itinerary itinerary = new Itinerary();
        itinerary.setDays(request.getDays());
        itinerary.setBudget(request.getBudget());

        List<ItineraryItem> items = new ArrayList<>();

        //fetch the data
        //add dummy data
        items.add(new ItineraryItem("Hotel", "Accommodation", "Nice place to stay", "Location", "Timing", new BigDecimal("100.00")));
        itinerary.setItems(items);
        recalculateCost(itinerary);

        return itineraryRepository.save(itinerary);
    }

    public Itinerary updateItinerary(String id, ItineraryRequest request) {
        Itinerary existingItinerary = itineraryRepository.findById(id).orElse(null);

        if (existingItinerary == null) {
            throw new ResourceNotFoundException("Itinerary not found with id: " + id);
        }
        existingItinerary.setDays(request.getDays());
        existingItinerary.setBudget(request.getBudget());
//        existingItinerary.setItems(request.getItems());


        return itineraryRepository.save(existingItinerary);
    }
}
