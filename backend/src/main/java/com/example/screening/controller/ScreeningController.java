package com.example.screening.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.screening.dto.EligibilityResult;
import com.example.screening.service.ScreeningService;

@RestController
@RequestMapping("/screening")
@CrossOrigin(origins = "http://localhost:3000")
public class ScreeningController {

  @Autowired private ScreeningService service;

  @PostMapping
  public Long save(@RequestBody String json) {
    return service.save(json);
  }

  
  @PostMapping("/{id}/apply")
  public ResponseEntity<?> apply(@PathVariable(required = false) Long id) {

    System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Result id: "+id);
    if (id == null) {
        return ResponseEntity.badRequest().body("Invalid screening ID");
    }

    try {
        return ResponseEntity.ok(service.evaluateEligibility(id));
    } catch (Exception e) {
          System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Result Exception: ");

        return ResponseEntity.internalServerError().body("Error processing application");
    }
  }


}