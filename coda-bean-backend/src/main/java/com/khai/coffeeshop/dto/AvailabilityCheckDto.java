package com.khai.coffeeshop.dto;

import java.time.LocalDateTime;

public record AvailabilityCheckDto(
        Long venueId,
        LocalDateTime startTime,
        LocalDateTime endTime
) {}
