package com.example.screening.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.screening.dto.EligibilityResult;
import com.example.screening.dto.MemberDTO;
import com.example.screening.model.Person;
import com.example.screening.repository.PersonRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ApplicationService {

  @Autowired private ScreeningService screeningService;
  @Autowired private PersonRepository personRepo;
  @Autowired private ObjectMapper mapper;

  private Person findOrCreatePerson(String name, LocalDate dob) {

    List<Person> persons = personRepo.findByNameAndDob(name, dob);

    if (!persons.isEmpty()) {
        return persons.get(0);
    }

    try {

      
        Person p = new Person();
        p.setName(name);
        p.setDob(dob);
        return personRepo.save(p);

    } catch (Exception e) {
        // Another thread inserted same record
        return personRepo.findByNameAndDob(name, dob).get(0);
    }
  }

}