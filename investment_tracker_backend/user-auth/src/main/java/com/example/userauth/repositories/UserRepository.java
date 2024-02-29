package com.example.userauth.repositories;

import com.example.userauth.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByEmail(String email);
}
