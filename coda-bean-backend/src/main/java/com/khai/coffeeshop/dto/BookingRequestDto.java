package com.khai.coffeeshop.dto;

import java.time.LocalDateTime;

public record BookingRequestDto(
        Long venueId,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String specialRequests
) {}
