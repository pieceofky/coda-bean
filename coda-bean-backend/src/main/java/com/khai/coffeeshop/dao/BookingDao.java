package com.khai.coffeeshop.dao;

import com.khai.coffeeshop.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingDao extends JpaRepository<Booking, Long> {
    @Query("SELECT b FROM Booking b WHERE b.venue.id = :venueId AND " +
            "((b.startTime BETWEEN :startTime AND :endTime) OR " +
            "(b.endTime BETWEEN :startTime AND :endTime) OR " +
            "(:startTime BETWEEN b.startTime AND b.endTime))")
    List<Booking> findConflictingBookings(
            @Param("venueId") Long venueId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );

    List<Booking> findByUserId(Integer user_id);
}
