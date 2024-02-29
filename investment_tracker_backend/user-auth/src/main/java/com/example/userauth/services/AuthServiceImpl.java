package com.example.userauth.services;

import com.example.userauth.dtos.SignupRequest;
import com.example.userauth.dtos.UserDTO;
import com.example.userauth.models.User;
import com.example.userauth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setFirstName(signupRequest.getFirstName());
        user.setLastName(signupRequest.getLastName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setPhoneNumber(signupRequest.getPhoneNumber());
        user.setDob(signupRequest.getDob());
        user.setAddress(signupRequest.getAddress());
        user.setSecurityQuestion(signupRequest.getSecurityQuestion());
        user.setSecurityAnswer(signupRequest.getSecurityAnswer());
        user.setCurrentBalance(signupRequest.getCurrentBalance());

        User createdUser = userRepository.save(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setId(createdUser.getId());
        userDTO.setFirstName(createdUser.getFirstName());
        userDTO.setLastName(createdUser.getLastName());
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setPhoneNumber(createdUser.getPhoneNumber());
        userDTO.setDob(createdUser.getDob());
        userDTO.setAddress(createdUser.getAddress());
        userDTO.setSecurityQuestion(createdUser.getSecurityQuestion());
        userDTO.setSecurityAnswer(createdUser.getSecurityAnswer());
        userDTO.setCurrentBalance(createdUser.getCurrentBalance());
        return userDTO;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users= userRepository.findAll();
        return users.stream().map(this::convertToUserDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserByID(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if(user == null)
            return null;
        return convertToUserDTO(user);
    }

    @Override
    public UserDTO updateUser(Long id, SignupRequest signupRequest) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) {
            return null;
        }
        existingUser.setFirstName(signupRequest.getFirstName());
        existingUser.setLastName(signupRequest.getLastName());
        existingUser.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        existingUser.setPhoneNumber(signupRequest.getPhoneNumber());
        existingUser.setDob(signupRequest.getDob());
        existingUser.setAddress(signupRequest.getAddress());
        existingUser.setSecurityQuestion(signupRequest.getSecurityQuestion());
        existingUser.setSecurityAnswer(signupRequest.getSecurityAnswer());
        existingUser.setCurrentBalance(signupRequest.getCurrentBalance());
        User updatedUser = userRepository.save(existingUser);
        return convertToUserDTO(updatedUser);
    }

    @Override
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true; // User deleted successfully
        }
        return false;
    }

    @Override
    public UserDTO updateBalance(Long id, int newBalance) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setCurrentBalance(newBalance);
            userRepository.save(user);
            return convertToUserDTO(user);
        }
        return null;
    }
    private UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setDob(user.getDob());
        userDTO.setAddress(user.getAddress());
        userDTO.setSecurityQuestion(user.getSecurityQuestion());
        userDTO.setSecurityAnswer(user.getSecurityAnswer());
        userDTO.setCurrentBalance(user.getCurrentBalance());
        return userDTO;
    }


}
