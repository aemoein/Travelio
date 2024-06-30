package com.example.travelio.repository;

import com.example.travelio.model.Itinerary;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItineraryRepository extends MongoRepository<Itinerary, String> {
}
