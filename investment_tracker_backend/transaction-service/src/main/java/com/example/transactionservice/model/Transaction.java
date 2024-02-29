package com.example.transactionservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
//import org.springframework.data.annotation.Id;

import java.util.Date;
@Entity(name = "transactionTable")
public class Transaction{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long user_id;
    private String type;
    private Double amount;
    private Double closingBalance;
    private long quantity;

    private Date transactionDate;

    private String stockSymbol;

    private String status;

    public Transaction() {
    }
    public Transaction(long user_id, String type, Double amount, Double closingBalance, long quantity, Date transactionDate, String stockSymbol, String status) {
        this.user_id = user_id;
        this.type = type;
        this.amount = amount;
        this.closingBalance = closingBalance;
        this.quantity = quantity;
        this.transactionDate = transactionDate;
        this.stockSymbol = stockSymbol;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getClosingBalance() {
        return closingBalance;
    }

    public void setClosingBalance(Double closingBalance) {
        this.closingBalance = closingBalance;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getStockSymbol() {
        return stockSymbol;
    }

    public void setStockSymbol(String stockSymbol) {
        this.stockSymbol = stockSymbol;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id='" + id + '\'' +
                ", user_id=" + user_id +
                ", type='" + type + '\'' +
                ", amount=" + amount +
                ", closingBalance=" + closingBalance +
                ", quantity=" + quantity +
                ", transactionDate=" + transactionDate +
                ", stockSymbol='" + stockSymbol + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
