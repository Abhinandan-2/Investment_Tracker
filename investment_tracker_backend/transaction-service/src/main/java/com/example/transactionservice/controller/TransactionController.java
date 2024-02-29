package com.example.transactionservice.controller;

import com.example.transactionservice.model.Transaction;
import com.example.transactionservice.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users/transaction-api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping()
    public ResponseEntity<Transaction> saveTransaction(@RequestBody Transaction transaction){
        return transactionService.saveTransaction(transaction);
    }

    @GetMapping()
    public  ResponseEntity<List<Transaction>> getAllTransaction(){
        return transactionService.getAllTransaction();
    }

    @GetMapping("/{id}")
    public  ResponseEntity<Transaction> getTransactionById(@PathVariable("id") Long id){
        return transactionService.getTransactionById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTransactionById(@PathVariable("id") Long id){
        return transactionService.deleteTransaction(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransactionById(@PathVariable("id") Long id, @RequestBody Transaction transaction){
        return transactionService.updateTransaction(id,transaction);
    }
}
