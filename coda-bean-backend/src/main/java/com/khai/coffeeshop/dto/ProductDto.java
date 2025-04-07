package com.khai.coffeeshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/*
category
productName
description
price double
imageUrl
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    Integer id;
    String category;
    String productName;
    String description;
    double price;
    String imageUrl;
}
