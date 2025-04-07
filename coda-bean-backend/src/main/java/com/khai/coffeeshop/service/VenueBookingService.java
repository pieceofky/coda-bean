package com.khai.coffeeshop.service;

import com.khai.coffeeshop.dao.BookingDao;
import com.khai.coffeeshop.dao.VenueDao;
import com.khai.coffeeshop.dto.AvailabilityCheckDto;
import com.khai.coffeeshop.dto.BookingRequestDto;
import com.khai.coffeeshop.dto.BookingResponseDto;
import com.khai.coffeeshop.dto.VenueDto;
import com.khai.coffeeshop.entity.Booking;
import com.khai.coffeeshop.entity.User;
import com.khai.coffeeshop.entity.Venue;
import com.khai.coffeeshop.enumTypes.BookingStatus;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VenueBookingService {

    private final VenueDao venueRepository;
    private final BookingDao bookingDao;
    private final UserService userService;

    public List<VenueDto> getAllAvailableVenues() {
        return venueRepository.findByIsAvailableTrue().stream()
                .map(this::convertToVenueDto)
                .collect(Collectors.toList());
    }

    public boolean checkAvailability(AvailabilityCheckDto availabilityCheck) {
        List<Booking> conflictingBookings = bookingDao.findConflictingBookings(
                availabilityCheck.venueId(),
                availabilityCheck.startTime(),
                availabilityCheck.endTime()
        );
        return conflictingBookings.isEmpty();
    }

    @Transactional
    public BookingResponseDto createBooking(BookingRequestDto bookingRequest, int userId) {
        Venue venue = venueRepository.findById(bookingRequest.venueId())
                .orElseThrow(() -> new EntityNotFoundException("Venue not found"));

        if (!venue.getIsAvailable()) {
            throw new IllegalStateException("Venue is not available for booking");
        }

        if (!checkAvailability(new AvailabilityCheckDto(
                bookingRequest.venueId(),
                bookingRequest.startTime(),
                bookingRequest.endTime()
        ))) {
            throw new IllegalStateException("Venue is already booked for the selected time");
        }

        User user = userService.getUserById(Math.toIntExact(userId));

        long hours = Duration.between(bookingRequest.startTime(), bookingRequest.endTime()).toHours();
        double totalPrice = venue.getPricePerHour() * hours;

        Booking booking = Booking.builder()
                .venue(venue)
                .user(user)
                .startTime(bookingRequest.startTime())
                .endTime(bookingRequest.endTime())
                .totalPrice(totalPrice)
                .status(BookingStatus.CONFIRMED)
                .createdAt(LocalDateTime.now())
                .specialRequests(bookingRequest.specialRequests())
                .build();

        Booking savedBooking = bookingDao.save(booking);
        return convertToBookingResponseDto(savedBooking);
    }

    public List<BookingResponseDto> getUserBookings(int userId) {
        return bookingDao.findByUserId(Math.toIntExact(userId)).stream()
                .map(this::convertToBookingResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void cancelBooking(Long bookingId, int userId) {
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow();

        throw new IllegalStateException("You can only cancel your own bookings");

    }

    private VenueDto convertToVenueDto(Venue venue) {
        return new VenueDto(
                venue.getId(),
                venue.getName(),
                venue.getLocation(),
                venue.getCapacity(),
                venue.getDescription(),
                venue.getPricePerHour(),
                venue.getIsAvailable(),
                venue.getImageUrl()
        );
    }

    private BookingResponseDto convertToBookingResponseDto(Booking booking) {
        return new BookingResponseDto(
                booking.getId(),
                convertToVenueDto(booking.getVenue()),
                booking.getUser().getId(),
                booking.getStartTime(),
                booking.getEndTime(),
                booking.getTotalPrice(),
                booking.getStatus().name(),
                booking.getCreatedAt(),
                booking.getSpecialRequests()
        );
    }
}
