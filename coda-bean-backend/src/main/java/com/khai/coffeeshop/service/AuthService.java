package com.khai.coffeeshop.service;

import com.khai.coffeeshop.dao.RoleDao;
import com.khai.coffeeshop.dao.UserDao;
import com.khai.coffeeshop.dto.UserTypes;
import com.khai.coffeeshop.entity.Admin;
import com.khai.coffeeshop.entity.Customer;
import com.khai.coffeeshop.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final RoleDao roleDao;
    private final UserDao userDao;

    public String login(String username, String password) {
        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,password
                )
        );
        SecurityContextHolder.getContext()
                .setAuthentication(authentication);
        StringBuilder sb=new StringBuilder();
        for(var role:authentication.getAuthorities()){
            sb.append(role.getAuthority());
        }
        return sb.toString();
    }

    @Transactional
    public String registerAdmin(UserTypes.AdminDto adminDto) {
        if (userDao.existsByUsername(adminDto.username())) {
            return "User with username %s already exists".formatted(adminDto.username());
        }

        Admin admin = new Admin();
        admin.setFirstName(adminDto.firstName());
        admin.setLastName(adminDto.lastName());
        admin.setUsername(adminDto.username());
        admin.setPassword(passwordEncoder.encode(adminDto.password()));
        admin.setEmail(adminDto.email());
        admin.setPhoneNumber(adminDto.phoneNumber());
        admin.setDepartment(adminDto.department());
        admin.setRole(roleDao.findByRoleName("ROLE_ADMIN").orElseThrow());
        userDao.save(admin);
        return "Admin %s %s registered successfully!".formatted(admin.getFirstName(), admin.getLastName());
    }

    @Transactional
    public String registerCustomer(UserTypes.CustomerDto customerDto) {
        System.out.println("inside customer register method");
        System.out.println(customerDto);
        Customer customer = new Customer();
        customer.setFirstName(customerDto.firstName());
        customer.setLastName(customerDto.lastName());
        customer.setUsername(customerDto.username());
        customer.setPassword(passwordEncoder.encode(customerDto.password()));
        customer.setEmail(customerDto.email());
        customer.setPhoneNumber(customerDto.phoneNumber());
        customer.setAddress(customerDto.address());
        customer.setRole(roleDao.findByRoleName("ROLE_CUSTOMER").orElseThrow());
        userDao.save(customer);
        return "Customer %s %s registered successfully!".formatted(customer.getFirstName(), customer.getLastName());
    }

    @Transactional
    public String deleteUser(String username) {
        User user = userDao.findByUsername(username).orElseThrow();
        System.out.println(user);
        userDao.delete(user);
        return "User %s deleted successfully!".formatted(user.getUsername());
    }
}