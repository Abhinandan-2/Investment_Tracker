package com.example.InvestmentServices.Service;

import com.example.InvestmentServices.Model.Investment;
import com.example.InvestmentServices.Repository.InvestmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class InvestmentService {

        private final InvestmentRepository investmentRepository;

        @Autowired
        public InvestmentService(InvestmentRepository investmentRepository) {
            this.investmentRepository = investmentRepository;
        }



    public List<Investment> getAllInvestments() {
            return investmentRepository.findAll();
        }

        public Optional<Investment> getInvestmentById(Long id) {
            return investmentRepository.findById(id);
        }

    public Investment createOrUpdateInvestment(Investment investment) {
        Long userId = investment.getUser_id();
        String stockSymbol = investment.getStock_symbol();

        // Check if the user has already bought this stock
        List<Investment> existingInvestments = investmentRepository.findByUserIdAndStockSymbol(userId, stockSymbol);

        if (existingInvestments.isEmpty()){
            if(investment.getQuantity()>0)
            return investmentRepository.save(investment);
            else return null;
        }
        Investment existingInvestment=existingInvestments.get(0);
        int quant=existingInvestment.getQuantity()+investment.getQuantity();
        if(quant>=0){
            int totalQuantity = existingInvestment.getQuantity() + investment.getQuantity();
            double weightedAverage = ((existingInvestment.getQuantity() * existingInvestment.getBuy_price())
                    + (investment.getQuantity() * investment.getBuy_price())) / totalQuantity;
            existingInvestment.setQuantity(totalQuantity);
            existingInvestment.setBuy_price(weightedAverage);
            existingInvestment.setCurrent_price(investment.getCurrent_price());

            if (quant == 0) {
                // If quantity is zero, delete the stock entry
                investmentRepository.delete(existingInvestment);
                return null;
            }
            else{
                return investmentRepository.save(existingInvestment);
            }
        }
        else{
            return null ;
        }
    }


    public Investment updateInvestment(Investment updatedInvestment) {
        Long userId = updatedInvestment.getUser_id();
        String stockSymbol = updatedInvestment.getStock_symbol();

        // Check if the user has already bought this stock
        List<Investment> existingInvestments = investmentRepository.findByUserIdAndStockSymbol(userId, stockSymbol);

        if (existingInvestments.isEmpty()) {
            // User hasn't bought this stock; you may want to handle this case accordingly
            // For example, return an error or create a new record
            return null;
        } else {
            // User has already bought this stock, update it
            Investment existingInvestment = existingInvestments.get(0); // Assuming only one record is found
            int totalQuantity = existingInvestment.getQuantity() + updatedInvestment.getQuantity();
            double weightedAverage = ((existingInvestment.getQuantity() * existingInvestment.getBuy_price())
                    + (updatedInvestment.getQuantity() * updatedInvestment.getBuy_price())) / totalQuantity;
            existingInvestment.setQuantity(totalQuantity);
            existingInvestment.setBuy_price(weightedAverage);
            existingInvestment.setCurrent_price(updatedInvestment.getCurrent_price());
            return investmentRepository.save(existingInvestment);
        }
    }


    public void deleteInvestment(Long id) {
            investmentRepository.deleteById(id);
        }


    public List<Investment> getInvestmentsByUserId(Long userId) {
        return investmentRepository.findByUserId(userId);
    }


}
