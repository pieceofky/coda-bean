package com.khai.coffeeshop.dao;

import com.khai.coffeeshop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductDao extends JpaRepository<Product, Integer> {
    Optional<Product> findProductById(Integer id);
}
