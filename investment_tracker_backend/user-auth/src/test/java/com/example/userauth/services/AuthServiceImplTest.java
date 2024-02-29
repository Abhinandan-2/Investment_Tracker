package com.example.userauth.services;

import com.example.userauth.dtos.SignupRequest;
import com.example.userauth.dtos.UserDTO;
import com.example.userauth.models.User;
import com.example.userauth.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.ArgumentMatchers.any;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

public class AuthServiceImplTest {
  @InjectMocks
  private AuthServiceImpl authService;

  @Mock
  private UserRepository userRepository;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.initMocks(this);
  }



  @Test
  void getAllUsersTest() {
    List<User> userList = new ArrayList<>();
    when(userRepository.findAll()).thenReturn(userList);
    List<UserDTO> users = authService.getAllUsers();
  }

  @Test
  void getUserByIdTest() {
    Long userId = 1L;
    User user = new User(/* set user attributes */);
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));
    UserDTO retrievedUser = authService.getUserByID(userId);
  }


  @Test
  void deleteUserTest() {
    Long userId = 1L;
    when(userRepository.existsById(userId)).thenReturn(true);
    boolean deleted = authService.deleteUser(userId);
  }

  @Test
  void updateBalanceTest() {
    Long userId = 1L;
    int newBalance = 100;
    User user = new User(/* set user attributes */);
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));
    UserDTO updatedBalance = authService.updateBalance(userId, newBalance);
  }
}
