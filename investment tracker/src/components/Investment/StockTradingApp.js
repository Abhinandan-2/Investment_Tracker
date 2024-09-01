import React, { useState } from 'react';
import StockListOne from './StockListOne';
import './StockTradingApp.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {  useNavigate } from "react-router-dom";

function StockTradingApp({user_id}) {
  
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + 5.5 * 60 * 60 * 1000);
  const [selectedStock, setSelectedStock] = useState(null);
  const [balance, setBalance] = useState(10000.00); // Initial balance
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [qunatityError, setQunatityError] = useState('');

  const isQuantityValid = quantity >= 1;

  const handlePost = async(type ,newBalance, status) =>{
    await axios.post("http://localhost:8082/transaction-api/transactionInfo",{
        "user_id" : user_id,
        "type" : type,
        "amount" : quantity * selectedStock.price,
        "closingBalance" : newBalance,
        "quantity" : quantity,
        "transactionDate" : currentDate,
        "stockSymbol" : selectedStock.symbol,
        "status" : status
      }).then((response)=>{
        if(status==='success'){
          alert(`${type}ed ${quantity} shares of ${selectedStock.symbol}`);
        }
        
      })
  }

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
  };

  const handleQuantityChange = (event) => {
    const { value } = event.target;
    setQuantity( value); 
    if (parseFloat(value) <= 0) {
      setQunatityError('Please enter valid quantity');
    } else {
      setQunatityError('');
    }
  };

  const handleBuyStock = async(price) => {
    const amount = quantity * price;
    if (balance >= amount) { // Update balance and perform other actions (e.g., add the stock to the user's portfolio)
      const newBalance = balance - quantity * price;
      setBalance(newBalance);
      handlePost('Buy' , newBalance, 'success');
      setSelectedStock(null);
    } else {
      handlePost('Buy' , balance, 'failed');
      alert('Insufficient balance to buy this stock');
    }
    setQuantity(1);
  };

  const handleSellStock = (price) => {
    const newBalance = balance + quantity * price;
    setBalance(newBalance);
    handlePost('Sell' , newBalance, 'success');
    setSelectedStock(null);
    setQuantity(1);
  };

  return (
    <>
     <Container className="stock-trading-app  mx-auto">
     <Row>
       <Col>
         <div className="header">
           <h1>Stock Trading</h1>
         </div>
         <p style={{fontWeight:'bold', marginTop : '20px'}}>Your Balance: ${balance.toFixed(2)}</p>
         {selectedStock && (
          <Card className="selected-stock">
          <Card.Header className='selected-stock-header'><h4>{selectedStock.company}</h4></Card.Header>
          <Card.Body>
            <Card.Title>{selectedStock.symbol}</Card.Title>
            <Card.Text>
            Price: ${selectedStock.price.toFixed(2)}
            </Card.Text>
            <Form>
      
        <Form.Group >
        <Row className= "quantityForm"> 
        <Col className="pr-2" >
                      <Form.Group>
                        <label className="lable-style" >Enter Quantity (To Buy/Sell)</label>
                        <Form.Control 
                          type="number"
                          value={quantity}
                          onChange={handleQuantityChange}
                          style={{width:'25%'}}
                          className= "mx-auto"
                        ></Form.Control>
                        <Form.Text className="text-danger">{qunatityError}</Form.Text>
                      </Form.Group>
                    </Col>
          </Row>
        </Form.Group>
            </Form>
                   <Button
                   className="buttonNatwest" 
                     onClick={() => handleBuyStock(selectedStock.price)}
                     disabled={!isQuantityValid}
                   >
                     Buy
                   </Button>
                   <Button
                  className="buttonNatwest" 
                     onClick={() => handleSellStock(selectedStock.price)}
                     disabled={!isQuantityValid}
                   >
                     Sell
                   </Button>
          </Card.Body>
         </Card>
         )}
       </Col>
     </Row>
     <Row>
       <Col>
         <StockListOne onStockSelect={handleStockSelect} />
       </Col>
     </Row>
   </Container>
   </>
  );
}

export default StockTradingApp;