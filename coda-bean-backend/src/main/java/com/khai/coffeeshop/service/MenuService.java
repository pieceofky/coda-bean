package com.khai.coffeeshop.service;

import com.khai.coffeeshop.dao.MenuCategoryDao;
import com.khai.coffeeshop.dao.MenuItemDao;
import com.khai.coffeeshop.dto.MenuCategoryDto;
import com.khai.coffeeshop.dto.MenuItemDto;
import com.khai.coffeeshop.entity.MenuCategory;
import com.khai.coffeeshop.entity.MenuItem;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MenuService {
    private final MenuCategoryDao menuCategoryDao;
    private final MenuItemDao menuItemDao;

    public List<MenuCategoryDto> getAllCategoriesWithItems() {
        return menuCategoryDao.findAll().stream()
                .map(MenuCategoryDto::fromEntity)
                .toList();
    }

    public MenuCategoryDto createCategory(MenuCategoryDto categoryDto) {
        MenuCategory category = new MenuCategory();
        category.setName(categoryDto.name());
        category.setDescription(categoryDto.description());
        category.setIconEmoji(categoryDto.iconEmoji());

        MenuCategory saved = menuCategoryDao.save(category);
        return MenuCategoryDto.fromEntity(saved);
    }

    public MenuItemDto addItemToCategory(Long categoryId, MenuItemDto itemDto) {
        MenuCategory category = menuCategoryDao.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        MenuItem item = itemDto.toEntity();
        item.setCategory(category);

        MenuItem saved = menuItemDao.save(item);
        return MenuItemDto.fromEntity(saved);
    }

    public MenuItemDto updateMenuItem(Long itemId, MenuItemDto itemDto) {
        MenuItem item = menuItemDao.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item not found"));

        item.setName(itemDto.name());
        item.setDescription(itemDto.description());
        item.setPrice(itemDto.price());
        item.setAvailable(itemDto.available());
        item.setImageUrl(itemDto.imageUrl());
        item.setPreparationTime(itemDto.preparationTime());
        item.setTags(itemDto.tags());

        return MenuItemDto.fromEntity(item);
    }

    public void deleteMenuItem(Long itemId) {
        menuItemDao.deleteById(itemId);
    }

    public List<MenuItemDto> searchItems(String query) {
        return menuItemDao.search(query).stream()
                .map(MenuItemDto::fromEntity)
                .toList();
    }
}