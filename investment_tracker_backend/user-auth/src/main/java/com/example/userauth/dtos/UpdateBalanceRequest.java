package com.example.userauth.dtos;
import lombok.Data;

@Data
public class UpdateBalanceRequest {
    private int currentBalance;

    public int getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(int currentBalance) {
        this.currentBalance = currentBalance;
    }
}