package com.khai.coffeeshop.dao;

import com.khai.coffeeshop.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VenueDao extends JpaRepository<Venue, Long> {
    List<Venue> findByIsAvailableTrue();
}

