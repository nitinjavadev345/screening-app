package com.example.screening.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Table(
  uniqueConstraints = @UniqueConstraint(columnNames = {"name", "dob"})
)
@Getter
@Setter
public class Person {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

  private String name;
  private LocalDate dob;
  
}