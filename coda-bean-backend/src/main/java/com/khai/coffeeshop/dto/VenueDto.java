package com.khai.coffeeshop.dto;

public record VenueDto(
        Long id,
        String name,
        String location,
        Integer capacity,
        String description,
        Double pricePerHour,
        Boolean isAvailable,
        String imageUrl
) {}

