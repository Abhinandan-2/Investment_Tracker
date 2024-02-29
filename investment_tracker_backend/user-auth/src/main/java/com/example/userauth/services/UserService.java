package com.example.userauth.services;

import com.example.userauth.models.User;
import com.example.userauth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByEmail(String email) {
        User user = this.userRepository.findFirstByEmail(email);
        return user;
    }
}
