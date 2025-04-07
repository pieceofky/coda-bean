package com.khai.coffeeshop.dao;

import com.khai.coffeeshop.entity.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MenuCategoryDao extends JpaRepository<MenuCategory, Long> {
    Optional<MenuCategory> findByName(String name);

    @Query("SELECT c FROM MenuCategory c LEFT JOIN FETCH c.items WHERE c.id = :id")
    Optional<MenuCategory> findByIdWithItems(@Param("id") Long id);
}