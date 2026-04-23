package com.example.screening.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.screening.model.ScreeningData;

public interface ScreeningRepository extends JpaRepository<ScreeningData, Long> {}