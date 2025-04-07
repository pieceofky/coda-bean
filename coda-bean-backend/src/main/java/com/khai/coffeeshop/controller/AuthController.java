package com.khai.coffeeshop.controller;

import com.khai.coffeeshop.dao.UserDao;
import com.khai.coffeeshop.dto.UserTypes;
import com.khai.coffeeshop.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserDao userDao;

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody UserTypes.LoginDto loginDto
    ) {
        String responseString = authService.login(
                loginDto.username(),
                loginDto.password()
        );
        return ResponseEntity.ok(responseString);
    }

    @PostMapping("/register-admin")
    public ResponseEntity<String> registerAdmin(
            @RequestBody UserTypes.AdminDto adminDto
    ) {
        if (adminDto == null) {
            return ResponseEntity.badRequest().build();
        } else if (userDao.existsByUsername(adminDto.username())) {
            return ResponseEntity.status(409).body(
                    "User with username %s already exists".formatted(
                            adminDto.username()
                    )
            );
        }
        String response = authService.registerAdmin(adminDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(
            @RequestBody UserTypes.CustomerDto customerDto
    ) {
        System.out.println(customerDto);
        System.out.println("register customer method post backend");
        if (customerDto == null) {
            return ResponseEntity.badRequest().build();
        } else if (userDao.existsByUsername(customerDto.username())) {
            return ResponseEntity.status(409).body(
                    "User with username %s already exists".formatted(
                            customerDto.username()
                    )
            );
        }

        String response = authService.registerCustomer(customerDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        if (!userDao.existsByUsername(username)) {
            return ResponseEntity.status(404).body(
                    "User with username %s not found".formatted(username)
            );
        }
        String response = authService.deleteUser(username);
        return ResponseEntity.ok(response);
    }
}

