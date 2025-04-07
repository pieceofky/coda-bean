package com.khai.coffeeshop.controller;

import com.khai.coffeeshop.dto.MenuCategoryDto;
import com.khai.coffeeshop.dto.MenuItemDto;
import com.khai.coffeeshop.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {
    private final MenuService menuService;

    @GetMapping
    public ResponseEntity<List<MenuCategoryDto>> getFullMenu() {
        return ResponseEntity.ok(menuService.getAllCategoriesWithItems());
    }

    @PostMapping("/categories")
    public ResponseEntity<MenuCategoryDto> createCategory(
            @RequestBody MenuCategoryDto categoryDto) {
        return ResponseEntity.ok(menuService.createCategory(categoryDto));
    }

    @PostMapping("/categories/{categoryId}/items")
    public ResponseEntity<MenuItemDto> addMenuItem(
            @PathVariable Long categoryId,
            @RequestBody MenuItemDto itemDto) {
        return ResponseEntity.ok(menuService.addItemToCategory(categoryId, itemDto));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<MenuItemDto> updateMenuItem(
            @PathVariable Long itemId,
            @RequestBody MenuItemDto itemDto) {
        return ResponseEntity.ok(menuService.updateMenuItem(itemId, itemDto));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long itemId) {
        menuService.deleteMenuItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<MenuItemDto>> searchMenuItems(
            @RequestParam String query) {
        return ResponseEntity.ok(menuService.searchItems(query));
    }
}
