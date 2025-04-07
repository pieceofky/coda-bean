package com.khai.coffeeshop.dto;

import com.khai.coffeeshop.entity.MenuCategory;

import java.util.List;

public record MenuCategoryDto(
        Long id,
        String name,
        String description,
        String iconEmoji,
        List<MenuItemDto> items
) {
    public static MenuCategoryDto fromEntity(MenuCategory category) {
        return new MenuCategoryDto(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getIconEmoji(),
                category.getItems().stream()
                        .map(MenuItemDto::fromEntity)
                        .toList()
        );
    }
}
