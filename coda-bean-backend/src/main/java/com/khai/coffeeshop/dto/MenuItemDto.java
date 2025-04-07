package com.khai.coffeeshop.dto;

import com.khai.coffeeshop.entity.MenuItem;

import java.math.BigDecimal;
import java.util.Set;

public record MenuItemDto(
        Long id,
        String name,
        String description,
        BigDecimal price,
        boolean available,
        String imageUrl,
        Integer preparationTime,
        Set<String> tags
) {
    public static MenuItemDto fromEntity(MenuItem item) {
        return new MenuItemDto(
                item.getId(),
                item.getName(),
                item.getDescription(),
                item.getPrice(),
                item.isAvailable(),
                item.getImageUrl(),
                item.getPreparationTime(),
                item.getTags()
        );
    }

    public MenuItem toEntity() {
        MenuItem item = new MenuItem();
        item.setName(this.name());
        item.setDescription(this.description());
        item.setPrice(this.price());
        item.setAvailable(this.available());
        item.setImageUrl(this.imageUrl());
        item.setPreparationTime(this.preparationTime());
        item.setTags(this.tags());
        return item;
    }
}