package com.khai.coffeeshop.controller;

import com.khai.coffeeshop.dto.ProductDto;
import com.khai.coffeeshop.service.ImageService;
import com.khai.coffeeshop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    private final ImageService imageService;

    @GetMapping
    public List<ProductDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<ProductDto> getProductDetail(@PathVariable int id) {
        ProductDto productDto = productService.getProductDetail(id);
        return ResponseEntity.ok(productDto);
    }

    @PostMapping("/create-products")
    public ResponseEntity<String> batchCreateProducts(@RequestBody List<ProductDto> productDtos) {
        String response = productService.createProducts(productDtos);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/new")
    public ResponseEntity<String> createNewProductWithoutImage(@RequestBody ProductDto productDto) {
        String response = productService.createNewProduct(productDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/new-product")
    public ResponseEntity<String> createNewProduct(
            @RequestPart("productDto") ProductDto productDto,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageName = imageService.saveProductImage(productDto.getId(), productDto.getProductName(), imageFile);
            productDto.setImageUrl(imageName);
        }

        String response = productService.createNewProduct(productDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/edit-product")
    public ResponseEntity<String> editProduct(
            @RequestPart("productDto") ProductDto productDto,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageName = imageService.saveProductImage(productDto.getId(), productDto.getProductName(), imageFile);
            productDto.setImageUrl(imageName);
        }

        String response = productService.updateProduct(productDto.getId(), productDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete-product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        String response = productService.deleteProduct(id);
        return ResponseEntity.ok(response);
    }
}
