package com.khai.coffeeshop.service;

import com.khai.coffeeshop.dao.UserDao;
import com.khai.coffeeshop.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    public String updateUserProfileUrl(String username, String filename) {
        User user = userDao.findByUsername(username).orElse(null);
        if (user == null) {
            return "user doesn't exist";
        }

        user.setImageUrl(filename);
        userDao.save(user);
        return filename;
    }

    public User getUserByUsername(String username) {
        return userDao.findByUsername(username).orElse(null);
    }

    public User getUserById(int id) {
        return userDao.findById(id).orElse(null);
    }
}