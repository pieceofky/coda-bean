package com.khai.coffeeshop.controller;

import com.khai.coffeeshop.dto.AvailabilityCheckDto;
import com.khai.coffeeshop.dto.BookingRequestDto;
import com.khai.coffeeshop.dto.BookingResponseDto;
import com.khai.coffeeshop.dto.VenueDto;
import com.khai.coffeeshop.security.SecurityUser;
import com.khai.coffeeshop.service.VenueBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
@RequiredArgsConstructor
public class VenueBookingController {
    private final VenueBookingService venueBookingService;

    @GetMapping
    public ResponseEntity<List<VenueDto>> getAllAvailableVenues() {
        return ResponseEntity.ok(venueBookingService.getAllAvailableVenues());
    }

    @PostMapping("/check-availability")
    public ResponseEntity<Boolean> checkAvailability(
            @RequestBody AvailabilityCheckDto availabilityCheck
    ) {
        return ResponseEntity.ok(venueBookingService.checkAvailability(availabilityCheck));
    }

    @PostMapping("/book")
    public ResponseEntity<BookingResponseDto> createBooking(
            @RequestBody BookingRequestDto bookingRequest,
            @AuthenticationPrincipal SecurityUser userDetails
    ) {
        return ResponseEntity.ok(venueBookingService.createBooking(bookingRequest, userDetails.getId()));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponseDto>> getUserBookings(
            @AuthenticationPrincipal SecurityUser userDetails
    ) {
        return ResponseEntity.ok(venueBookingService.getUserBookings(userDetails.getId()));
    }

    @PostMapping("/cancel/{bookingId}")
    public ResponseEntity<Void> cancelBooking(
            @PathVariable Long bookingId,
            @AuthenticationPrincipal SecurityUser userDetails
    ) {
        venueBookingService.cancelBooking(bookingId, userDetails.getId());
        return ResponseEntity.noContent().build();
    }
}