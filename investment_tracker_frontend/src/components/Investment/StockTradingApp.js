import React, { useState,Component, useEffect } from 'react';
import StockListOne from './StockListOne';
import './StockTradingApp.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import investment_url from '../../APIs/Investment-api';
import transaction_api from '../../APIs/Transaction-api';
import NavBar from '../NavBar/NavBar';
import { useUser } from '../../context/UserContext';
import axiosInstance from '../../axiosInstance';
import user_api from '../../APIs/user-api';

function StockTradingApp(){
  const [balance, setBalance] = useState(); 
  useEffect(()=>{

    axiosInstance.get(`${user_api}/${userData.id}`)
    .then((response)=>{
      setBalance(response.data.currentBalance);
    })

  },[balance]);
  const {userData} =useUser();
  const user_id = userData.id;
  const userBalance = userData.currentBalance;
  console.log(userBalance);
  const navigate = useNavigate();

  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + 5.5 * 60 * 60 * 1000);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [qunatityError, setQunatityError] = useState('');
  const isQuantityValid = quantity > 0;

  const handlePost = async(type ,newBalancea, status) =>{
    await axios.post(transaction_api,{
        "user_id" : user_id,
        "type" : type,
        "amount" : quantity * selectedStock.price,
        "closingBalance" : newBalancea,
        "quantity" : quantity,
        "transactionDate" : currentDate,
        "stockSymbol" : selectedStock.symbol,
        "status" : status
      }).then((response)=>{
        // navigate("/Dashboard");
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
    if (balance >= amount) { 
      const StockDetails={
      user_id : user_id,
      stock_symbol:selectedStock.symbol,
      buy_price:selectedStock.price,
      current_price:selectedStock.price,
      quantity,
      company_name:selectedStock.company,
    };

  
    axios.post(`${investment_url}/investments`,StockDetails)
    .then((response) =>{
      if(response.status===200){
        toast.success('Bought Stock Successfully', { position: 'top-right' });
      } else{
        toast.error('Error buying in stock', { position: 'top-right' });
      }
    })
    .catch((error) => {
      console.error('Error stock details:',error);
      toast.error('Error !',{position:'top-right'})
    }) ;
  };


    if (balance >= amount) { // Update balance and perform other actions (e.g., add the stock to the user's portfolio)
      const newBalance = balance - quantity * price;
      setBalance(newBalance);
      handlePost('Buy' , newBalance, 'success');
      axiosInstance.patch(`${user_api}/balance/${user_id}`,{
        "currentBalance" : newBalance
      }).then((response)=>{
      })
      setSelectedStock(null);
    } else {
      handlePost('Buy' , balance, 'failed');
      toast.error('Insufficient balance to buy this stock', { position: 'top-right' });
    }
    setQuantity(1);
  
}

const handleSellStock = async (price) => {
  try {
    const newBalance = balance + quantity * price;
    const stockDetailsCopy = {
      user_id:user_id,
      stock_symbol: selectedStock.symbol,
      buy_price: selectedStock.price,
      current_price: selectedStock.price,
      quantity: 0,
      company_name: selectedStock.company,
    };
    const responseCopy = await axios.post(`${investment_url}/investments`, stockDetailsCopy);
    if (isNaN(responseCopy.data.quantity)||responseCopy.data.quantity<quantity) {
      handlePost('Sell', balance, 'failed');
      toast.error('Stock not available', { position: 'top-right' });
    }
    else if (responseCopy.status === 200) {
      stockDetailsCopy.quantity = -quantity;
      await axios.post(`${investment_url}/investments`, stockDetailsCopy);
      setBalance(newBalance);
      handlePost('Sell', newBalance, 'success');
      axiosInstance.patch(`${user_api}/balance/${user_id}`,{
        "currentBalance" : newBalance
      }).then((response)=>{
      })
      toast.success('Stock sold !!', { position: 'top-right' });
    } 
     else {
      toast.error('Error selling stock !!', { position: 'top-right' });
      console.error('Failed to update stock:', responseCopy.data);
    }

    
  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred');
  }
    setSelectedStock(null);
    setQuantity(1);
};

  return (
    <>


<NavBar heding="Invest"/>

<div className="header">
    <h1>Stock Trading</h1>
</div>
     <Container className="stock-trading-app  mx-auto">
     <Row>
       <Col>
         
         <p style={{fontWeight:'bold', marginTop : '20px'}}>Your Balance: ${balance}</p>
         {selectedStock && (
          <Card className="selected-stock">
          <Card.Header className='selected-stock-header'><h4>{selectedStock.company}</h4></Card.Header>
          <Card.Body>
            <Card.Title>{selectedStock.symbol}</Card.Title>
            <Card.Text>
            Price: ${selectedStock.price}
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