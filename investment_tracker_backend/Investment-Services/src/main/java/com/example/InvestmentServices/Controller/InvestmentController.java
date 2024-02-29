package com.example.InvestmentServices.Controller;

import com.example.InvestmentServices.Model.Investment;
import com.example.InvestmentServices.Service.InvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.InvestmentServices.Repository.InvestmentRepository;
import com.example.InvestmentServices.Model.Investment;

import java.util.List;
import java.util.Optional;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/users/investments")
public class InvestmentController {


    private final InvestmentService investmentService;

    @Autowired
    public InvestmentController(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }


    @GetMapping
    public List<Investment> getAllInvestments() {
        return investmentService.getAllInvestments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvestmentById(@PathVariable Long id) {
        Optional<Investment> investment = investmentService.getInvestmentById(id);
        if (investment.isPresent()) {
            return ResponseEntity.ok(investment.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public Investment createInvestment(@RequestBody Investment investment) {
        return investmentService.createOrUpdateInvestment(investment);
    }

    @PutMapping("/{id}")
    public Investment updateInvestment( @RequestBody Investment investment) {
        return investmentService.updateInvestment(investment);
    }

    @DeleteMapping("/{id}")
    public void deleteInvestment(@PathVariable Long id) {
        investmentService.deleteInvestment(id);
    }


    @GetMapping("/user/{userId}/investments")
    public List<Investment> getInvestmentsByUserId(@PathVariable Long userId) {
        return investmentService.getInvestmentsByUserId(userId);
    }






}