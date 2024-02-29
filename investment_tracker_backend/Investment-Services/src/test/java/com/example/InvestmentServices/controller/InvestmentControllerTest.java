package com.example.InvestmentServices.controller;

import com.example.InvestmentServices.Model.Investment;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class InvestmentControllerTest {

    @LocalServerPort
    private int port;

    private final TestRestTemplate restTemplate = new TestRestTemplate();

    @Test
    void testGetAllInvestments() {
        Investment[] investments = restTemplate.getForObject("http://localhost:" + port + "/api/users/investments", Investment[].class);
        // Add assertions for the response content if needed
    }

    @Test
    void testGetInvestmentById() {
        Long investmentId = 1L;
        Investment investment = restTemplate.getForObject("http://localhost:" + port + "/api/users/investments/" + investmentId, Investment.class);
        // Add assertions for the response content if needed
    }

    @Test
    void testCreateInvestment() {
        Investment newInvestment = new Investment(/* Initialize with data */);
        Investment result = restTemplate.postForObject("http://localhost:" + port + "/api/users/investments", newInvestment, Investment.class);
        // Add assertions for the created investment if needed
    }

    @Test
    void testUpdateInvestment() {
        Long investmentId = 1L;
        Investment updatedInvestment = new Investment(/* Initialize with data */);
        restTemplate.put("http://localhost:" + port + "/api/users/investments/" + investmentId, updatedInvestment);
        // Optionally, retrieve and assert the updated investment
    }

    @Test
    void testDeleteInvestment() {
        Long investmentId = 1L;
        restTemplate.delete("http://localhost:" + port + "/api/users/investments/" + investmentId);
        // Optionally, verify that the investment with the specified ID is deleted
    }
}
