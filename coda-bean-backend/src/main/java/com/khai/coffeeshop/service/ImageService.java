package com.khai.coffeeshop.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {
    private final String productImageDir = Paths.get(System.getProperty("user.dir"), "uploads", "product_images").toString();

    private final String profileImageDir = Paths.get(System.getProperty("user.dir"), "uploads", "profile_images").toString();

    public String saveProductImage(Integer id, String productName, MultipartFile imageFile) throws IOException {
        if (imageFile == null || imageFile.isEmpty()) {
            throw new IllegalArgumentException("Invalid image file: File is empty or null");
        }

        File uploadDir = new File(productImageDir);
        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdirs();
            if (!created) {
                throw new IOException("Failed to create upload directory: " + uploadDir.getAbsolutePath());
            }
        }

        String originalFilename = imageFile.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new IllegalArgumentException("Invalid file name");
        }

        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String fileNameToSave = UUID.randomUUID() + "_" + productName + "_" + id.toString() + fileExtension;

        File uploadFile = new File(new File(productImageDir), fileNameToSave);
        System.out.println("Saving file to: " + uploadFile.getAbsolutePath()); // Debug log
        imageFile.transferTo(uploadFile);

        return fileNameToSave;
    }

    public String deleteProductImage(String imageName) {
        System.out.println("Inside deleteImage method");

        Path imagePath = Paths.get(productImageDir, imageName);
        System.out.println("Attempting to delete: " + imagePath.toAbsolutePath());

        try {
            if (Files.exists(imagePath)) {
                Files.delete(imagePath);
                return "Image deleted successfully: " + imageName;
            } else {
                return "Image not found: " + imageName;
            }
        } catch (NoSuchFileException e) {
            return "File not found (NoSuchFileException): " + imageName;
        } catch (IOException e) {
            e.printStackTrace(); // Log full stack trace for debugging
            return "Failed to delete image due to an error: " + imageName;
        }
    }

    public String saveProfileImage(String userName, MultipartFile imageFile) throws IOException {
        if (imageFile == null || imageFile.isEmpty()) {
            throw new IllegalArgumentException("Invalid image file: File is empty or null");
        }

        File uploadDir = new File(profileImageDir);
        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdirs();
            if (!created) {
                throw new IOException("Failed to create upload directory: " + uploadDir.getAbsolutePath());
            }
        }

        String originalFilename = imageFile.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new IllegalArgumentException("Invalid file name");
        }

        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String fileNameToSave = UUID.randomUUID() + "_" + userName + fileExtension;

        File uploadFile = new File(new File(profileImageDir), fileNameToSave);
        System.out.println("Saving file to: " + uploadFile.getAbsolutePath()); // Debug log
        imageFile.transferTo(uploadFile);

        return fileNameToSave;
    }
    public String deleteProfileImage(String imageName) {
        System.out.println("Inside delete image method");
        File imageFile = new File(new File(profileImageDir), imageName);
        if (imageFile.exists()) {
            boolean deleted = imageFile.delete();
            if (deleted) {
                return "Image deleted successfully";
            } else {
                return "Failed to delete image";
            }
        } else {
            return "Image not found";
        }
    }

}
