package com.example.InvestmentServices.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import javax.annotation.processing.Generated;

@Entity
public class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long investment_id;

    private Long user_id;
    private Long portfolio_id;
    private String stock_symbol;
    private String company_name;
    private int quantity;
    private double buy_price;
    private double current_price;

    public Investment(Long investment_id, Long user_id, Long portfolio_id, String stock_symbol,
                      String company_name, int quantity, double buy_price, double current_price) {
        this.investment_id = investment_id;
        this.user_id = user_id;
        this.portfolio_id = portfolio_id;
        this.stock_symbol = stock_symbol;
        this.company_name = company_name;
        this.quantity = quantity;
        this.buy_price = buy_price;
        this.current_price = current_price;
    }

    public Investment() {
    }

    public Long getInvestment_id() {
        return investment_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public Long getPortfolio_id() {
        return portfolio_id;
    }

    public String getStock_symbol() {
        return stock_symbol;
    }

    public String getCompany_name() {
        return company_name;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getBuy_price() {
        return buy_price;
    }

    public double getCurrent_price() {
        return current_price;
    }

    public void setInvestment_id(Long investment_id) {
        this.investment_id = investment_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public void setPortfolio_id(Long portfolio_id) {
        this.portfolio_id = portfolio_id;
    }

    public void setStock_symbol(String stock_symbol) {
        this.stock_symbol = stock_symbol;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setBuy_price(double buy_price) {
        this.buy_price = buy_price;
    }

    public void setCurrent_price(double current_price) {
        this.current_price = current_price;
    }

    @Override
    public String toString() {
        return "Investment{" +
                "investment_id=" + investment_id +
                ", user_id=" + user_id +
                ", portfolio_id=" + portfolio_id +
                ", stock_symbol='" + stock_symbol + '\'' +
                ", company_name='" + company_name + '\'' +
                ", quantity=" + quantity +
                ", buy_price=" + buy_price +
                ", current_price=" + current_price +
                '}';
    }
}
