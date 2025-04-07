package com.khai.coffeeshop.dto;

import java.time.LocalDateTime;

public record BookingResponseDto(
        Long id,
        VenueDto venue,
        Integer userId,
        LocalDateTime startTime,
        LocalDateTime endTime,
        Double totalPrice,
        String status,
        LocalDateTime createdAt,
        String specialRequests
) {}
