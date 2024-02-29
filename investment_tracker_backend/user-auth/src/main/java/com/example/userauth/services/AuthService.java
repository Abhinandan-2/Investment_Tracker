package com.example.userauth.services;

import com.example.userauth.dtos.SignupRequest;
import com.example.userauth.dtos.UserDTO;

import java.util.List;

public interface AuthService {
    UserDTO createUser(SignupRequest signupRequest);

    List<UserDTO> getAllUsers();

    UserDTO getUserByID(Long id);

    UserDTO updateUser(Long id, SignupRequest signupRequest);

    boolean deleteUser(Long id);

    UserDTO updateBalance(Long id, int currentBalance);
}
