package com.khai.coffeeshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer id;
    private String category;
    private String productName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private double price;

    @Column(name = "image_url")
    private String imageUrl;

    // Constructor without id for creation
    public Product(String category, String productName, String description, double price, String imageUrl) {
        this.category = category;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    public Product(String category, String productName, String description, double price) {
        this.category = category;
        this.productName = productName;
        this.description = description;
        this.price = price;
    }
}