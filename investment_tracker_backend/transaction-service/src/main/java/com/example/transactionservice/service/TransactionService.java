package com.example.transactionservice.service;

import com.example.transactionservice.model.Transaction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TransactionService {
    ResponseEntity<Transaction> saveTransaction(Transaction transaction);

    ResponseEntity<List<Transaction>> getAllTransaction();

    ResponseEntity<Transaction> getTransactionById(Long id);

    ResponseEntity<HttpStatus> deleteTransaction(Long id);

    ResponseEntity<Transaction> updateTransaction(Long id, Transaction transaction);
}
