package com.khai.coffeeshop.service;

import com.khai.coffeeshop.dao.ProductDao;
import com.khai.coffeeshop.dto.ProductDto;
import com.khai.coffeeshop.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/*
category
productName
description
price double
imageUrl
 */

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductDao productDao;

    public List<ProductDto> getAllProducts() {
        return productDao.findAll().stream().map(this::mappToDto).toList();
    }

    @Transactional(readOnly = true)
    public ProductDto getProductDetail(int id) {
        Product product = productDao.findProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return mappToDto(product);
    }

    public String createNewProduct(ProductDto productDto) {
        Product product = new Product();
        product.setCategory(productDto.getCategory());
        product.setProductName(productDto.getProductName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setImageUrl(productDto.getImageUrl());
        productDao.save(product);
        return "new Product %s is created".formatted(product.getProductName());
    }

    public String deleteProduct(int id) {
        Product product = productDao.findProductById(id).orElseThrow();
        productDao.delete(product);
        return "Product %s is deleted".formatted(product.getProductName());
    }

    public String updateProduct(int id, ProductDto productDto) {
        Product product = productDao.findProductById(id).orElseThrow();
        product.setCategory(productDto.getCategory());
        product.setProductName(productDto.getProductName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setImageUrl(productDto.getImageUrl());
        productDao.save(product);
        return "Product %s is updated".formatted(product.getProductName());
    }

    public ProductDto mappToDto(Product product) {
        return new ProductDto(product.getId(), product.getCategory(), product.getProductName(), product.getDescription(), product.getPrice(), product.getImageUrl());
    }

    public Product convertToProduct(ProductDto productDto) {
        return new Product(productDto.getCategory(), productDto.getProductName(), productDto.getDescription(), productDto.getPrice());
    }

    public String createProducts(List<ProductDto> productDtos) {
        productDtos.forEach(productdto -> productDao.save(convertToProduct(productdto)));
        return "Products saved successfully!";
    }
}
