package com.example.userauth.controllers;
import com.example.userauth.dtos.SignupRequest;
import com.example.userauth.dtos.UpdateBalanceRequest;
import com.example.userauth.dtos.UserDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SignupUserControllerTest {

  @LocalServerPort
  private int port;

  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  void createUserTest() {
    SignupRequest signupRequest = new SignupRequest(/* provide necessary parameters */);
    UserDTO response = restTemplate.postForObject("http://localhost:" + port + "/api/register", signupRequest, UserDTO.class);
  }

  @Test
  void getAllUsersTest() {
    UserDTO[] users = restTemplate.getForObject("http://localhost:" + port + "/api/users", UserDTO[].class);

  }

  @Test
  void getUserByIdTest() {
    Long userId = 1L;
    UserDTO user = restTemplate.getForObject("http://localhost:" + port + "/api/users/" + userId, UserDTO.class);

  }

  @Test
  void updateUserTest() {
    Long userId = 1L;
    SignupRequest signupRequest = new SignupRequest(/* provide necessary parameters */);
    restTemplate.put("http://localhost:" + port + "/api/users/" + userId, signupRequest);

  }

  @Test
  void deleteUsersTest() {
    Long userId = 1L;
    restTemplate.delete("http://localhost:" + port + "/api/users/" + userId);

  }

}
