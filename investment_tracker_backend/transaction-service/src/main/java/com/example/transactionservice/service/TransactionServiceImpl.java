package com.example.transactionservice.service;

import com.example.transactionservice.model.Transaction;
import com.example.transactionservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    @Override
    public ResponseEntity<Transaction> saveTransaction(Transaction transaction) {
        try{
            transactionRepository.save(transaction);
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<Transaction>> getAllTransaction() {
        try{
            List<Transaction> transactions = new ArrayList<>();
            transactionRepository.findAll().forEach(transactions::add);
            if(transactions.isEmpty()){
                return new ResponseEntity<>(transactions,HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(transactions,HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Transaction> getTransactionById(Long id) {
        try{
            Optional<Transaction> transactionData = transactionRepository.findById(id);
            if(transactionData.isPresent()){
                return new ResponseEntity<>(transactionData.get(),HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception ex){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<HttpStatus> deleteTransaction(Long id) {
        try{
            transactionRepository.deleteById(id);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Transaction> updateTransaction(Long id, Transaction transaction) {
        Optional<Transaction> transactionData = transactionRepository.findById(id);
        if(transactionData.isPresent()){
            Transaction _transaction = transactionData.get();
            _transaction.setUser_id(transaction.getUser_id());
            _transaction.setAmount(transaction.getAmount());
            _transaction.setClosingBalance(transaction.getClosingBalance());
            _transaction.setQuantity(transaction.getQuantity());
            _transaction.setType(transaction.getType());
            _transaction.setTransactionDate(transaction.getTransactionDate());
            _transaction.setStockSymbol(transaction.getStockSymbol());
            _transaction.setStatus(transaction.getStatus());
            try{
                transactionRepository.save(_transaction);
                return new ResponseEntity<>(_transaction, HttpStatus.OK);
            }
            catch (Exception ex){
                return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
