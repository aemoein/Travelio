package com.example.travelio.controller;

import com.example.travelio.model.Itinerary;
import com.example.travelio.model.ItineraryItem;
import com.example.travelio.dto.ItineraryRequest;
import com.example.travelio.service.ItineraryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {
    @Autowired
    private ItineraryService itineraryService;

    @PostMapping
    public ResponseEntity<Itinerary> createItinerary(@RequestBody ItineraryRequest request) {
        Itinerary createdItinerary = itineraryService.createItinerary(request);
        return new ResponseEntity<>(createdItinerary, HttpStatus.CREATED);
    }

    @PostMapping("/generate")
    public ResponseEntity<Itinerary> generateItinerary(@RequestBody ItineraryRequest itineraryRequest) {
        Itinerary itinerary = itineraryService.generateItinerary(itineraryRequest);
        return ResponseEntity.ok(itinerary);
    }

    @PutMapping("/{id}/customize")
    public ResponseEntity<Itinerary> customizeItinerary(@PathVariable String id, @RequestBody List<ItineraryItem> items) {
        Itinerary customizedItinerary = itineraryService.customizeItinerary(id, items);
        return new ResponseEntity<>(customizedItinerary, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Itinerary> updateItinerary(@PathVariable String id, @RequestBody ItineraryRequest request) {
        Itinerary updatedItinerary = itineraryService.updateItinerary(id, request);
        return ResponseEntity.ok(updatedItinerary);
    }

    @GetMapping
    public ResponseEntity<List<Itinerary>> getAllItineraries() {
        List<Itinerary> itineraries = itineraryService.getAllItineraries();
        return new ResponseEntity<>(itineraries, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Itinerary> getItineraryById(@PathVariable String id) {
        Itinerary itinerary = itineraryService.getItineraryById(id);
        return new ResponseEntity<>(itinerary, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItinerary(@PathVariable String id) {
        itineraryService.deleteItinerary(id);
        return ResponseEntity.noContent().build();
    }

    //not completed yet
    /*
    @GetMapping("/{id}/export")
    public ResponseEntity<byte[]> exportItinerary(@PathVariable String id, @RequestParam String format) {
        byte[] exportedBytes = itineraryService.exportItinerary(id, format);

        if (exportedBytes == null) {
            return ResponseEntity.notFound().build();
        }

        MediaType contentType;
        String fileName;

        // Determine content type and filename based on format
        switch (format.toLowerCase()) {
            case "pdf":
                contentType = MediaType.APPLICATION_PDF;
                fileName = "itinerary.pdf";
                break;
            case "csv":
                contentType = MediaType.TEXT_PLAIN;
                fileName = "itinerary.csv";
                break;
            //and more cases to be added
            default:
                return ResponseEntity.badRequest().body("Unsupported format: " + format);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(contentType);
        headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileName).build());

        return new ResponseEntity<>(exportedBytes, headers, HttpStatus.OK);
    }
   */

}
