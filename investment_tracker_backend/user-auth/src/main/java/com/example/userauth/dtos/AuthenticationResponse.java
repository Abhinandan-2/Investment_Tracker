package com.example.userauth.dtos;

import com.example.userauth.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;

    private User user;

    public AuthenticationResponse(String jwt, User user) {
        this.jwt =jwt;
        this.user = user;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
