

package com.example.InvestmentServices.Repository;

import com.example.InvestmentServices.Model.Investment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvestmentRepository extends JpaRepository<Investment,Long> {


    @Query("SELECT i FROM Investment i WHERE i.user_id = :userId AND i.stock_symbol = :stockSymbol")
    List<Investment> findByUserIdAndStockSymbol(
            @Param("userId") Long userId,
            @Param("stockSymbol") String stockSymbol
    );
    @Query("SELECT i FROM Investment i WHERE i.user_id = :userId")
    List<Investment> findByUserId(@Param("userId") Long userId);

}





