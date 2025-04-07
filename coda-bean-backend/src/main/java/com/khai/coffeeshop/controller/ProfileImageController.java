package com.khai.coffeeshop.controller;

import com.khai.coffeeshop.service.ImageService;
import com.khai.coffeeshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/users/image")
@RequiredArgsConstructor
public class ProfileImageController {
    private final ImageService imageService;
    private final UserService userService;
    private final Path imagePath = Paths.get("uploads/profile_images");

    @GetMapping("/{imageName}")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable String imageName) throws IOException {
        byte[] imageBytes = Files.readAllBytes(Path.of(imagePath + "/" + imageName));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Adjust based on your image type

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadProfileImage(
            @RequestParam("username") String username,
            @RequestParam("imageFile") MultipartFile imageFile
    ) throws Exception {
        // Save the image and get the filename
        String filename = imageService.saveProfileImage(username, imageFile);

        // Update user's profileImageUrl in database
        String response = userService.updateUserProfileUrl(username, filename);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{username}")
    public String deleteProfileImage(@PathVariable String username) {
        return imageService.deleteProfileImage(username);
    }
}