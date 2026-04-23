package com.example.screening.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.screening.model.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

    List<Person> findByNameAndDob(String name, LocalDate dob);
} 