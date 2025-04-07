package com.khai.coffeeshop.dao;

import com.khai.coffeeshop.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuItemDao extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategoryId(Long categoryId);

    List<MenuItem> findByAvailableTrue();

    @Query("SELECT i FROM MenuItem i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(i.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<MenuItem> search(@Param("query") String query);
}