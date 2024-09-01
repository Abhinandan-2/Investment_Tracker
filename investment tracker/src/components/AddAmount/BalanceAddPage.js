import React, { useState , useEffect} from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BalanceAddPage.css';
import axios from "axios";
import { toast } from 'react-toastify';
import transaction_api from "../../APIs/Transaction-api";
import NavBar from '../NavBar/NavBar';
import { useUser } from '../../context/UserContext';
import axiosInstance from '../../axiosInstance';
import user_api from '../../APIs/user-api';


function BalanceAddPage() {
  const [balance, setBalance] = useState(); // Initial balance

  useEffect(()=>{
    axiosInstance.get(`${user_api}/${userData.id}`)
    .then((response)=>{
      setBalance(response.data.currentBalance);
    })

  },[balance]);
  let {userData} =useUser();
  const user_id = userData.id;
  const userBalance = userData.currentBalance;
  console.log(userBalance);
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + 5.5 * 60 * 60 * 1000);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });
  const [upiDetails, setUpiDetails] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expirationDateError, setExpirationDateError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [upiIdError, setUpiIdError] = useState('');

  const handleAmountChange = (event) => {
    const { value } = event.target;
    setAmountToAdd(value);
    if (parseFloat(value) <= 0) {
      setAmountError('Please enter valid amount');
    } else {
      setAmountError('');
    }
  };

  const handleupiDetailsChange = (event) =>{  const { value } = event.target;
  setUpiDetails(value);
  if (!value.includes('@')) {
    setUpiIdError('Please enter a valid UPI ID with "@" symbol');
  } else {
    setUpiIdError('');
  }
  }

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardDetailsChange = (event) => {
      const { name, value } = event.target;
      if (name === 'cardNumber') { // Validation for card number
        const cleanedValue = value.replace(/\D/g, ''); // Remove non-digit characters
        setCardDetails({
          ...cardDetails,
          cardNumber: cleanedValue,
        });
        if (cleanedValue.length === 16) {
          setCardNumberError('');
        } else {
          setCardNumberError('Please enter a valid 16-digit card number');
        }
      }
      else if (name === 'expirationDate') { // Validation for expiration date (MM/YYYY format)
        const cvvRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
      setCardDetails({
        ...cardDetails,
        expirationDate: value,
      });
      if (cvvRegex.test(value)) {
        setExpirationDateError('');
      } else {
        setExpirationDateError('Please enter a valid MM/YY expiration date');
      }
      }
      else if (name === 'cvv') { // Validation for CVV
        const cleanedValue = value.replace(/\D/g, ''); // Remove non-digit characters
        setCardDetails({
          ...cardDetails,
          cvv: cleanedValue,
        });
        if (cleanedValue.length === 3) {
          setCvvError('');
        } else {
          setCvvError('Please enter a valid 3-digit CVV');
        }
      }
      else{
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  }
  };

  const handlePost = async(newBalance) =>{
    await axios.post(transaction_api,{
        "user_id" : user_id,
        "type" : 'Add Amount',
        "amount" : amountToAdd,
        "closingBalance" : newBalance,
        "quantity" : 0,
        "transactionDate" : currentDate,
        "stockSymbol" : "-",
        "status" : 'success'
      }).then((response)=>{
        toast.success('Amount Added Successfully', { position: 'top-right' });
        // navigate("/Dashboard");
      })
  }

  const handleAddBalance = () => {
    if (!amountToAdd || !paymentMethod) {
      alert('Please fill in all required fields.');
      return;
    }
    const amount = parseFloat(amountToAdd);
    if (!isNaN(amount) && amount > 0) {
      const newBalance = balance + amount;
      setBalance(newBalance);
      handlePost(newBalance);
      // Post newBalance as userData.balance
      axiosInstance.patch(`${user_api}/balance/${user_id}`,{
        "currentBalance" : newBalance
      }).then((response)=>{
      })
      setAmountToAdd('');
      setPaymentMethod('');
      setCardDetails({
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        cvv: '',
      });
      setUpiDetails('');
    } else {
      alert('Please enter a valid amount to add.');
    }
  };

  // Conditional rendering based on the payment method
  let paymentForm;
  if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
    paymentForm = (
      <div>
        <p className="para_bold">Enter {paymentMethod === 'creditCard' ? 'Credit ' : 'Debit '}Card Details</p>
        <Form.Group as={Row}>
          <Form.Label className="formLabel" column sm="4">Enter Card Number *</Form.Label>
          <Col sm="7">
            <Form.Control
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
              className='input-field'
              required
            />
             <Form.Text className="text-danger">{cardNumberError}</Form.Text>
            <Form.Control.Feedback type="invalid">Please enter a valid 16-digit card number.</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label className="formLabel" column sm="4">Enter Card Holder Name *</Form.Label>
          <Col sm="7">
            <Form.Control
              type="text"
              name="cardHolder"
              placeholder="Card Holder"
              value={cardDetails.cardHolder}
              onChange={handleCardDetailsChange}
              className='input-field'
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label className="formLabel" column sm="4">Enter Expiration Date *</Form.Label>
          <Col sm="7">
            <Form.Control
              type="text"
              name="expirationDate"
              placeholder="MM/YY"
              value={cardDetails.expirationDate}
              onChange={handleCardDetailsChange}
              className='input-field'
              required
            />
            <Form.Text className="text-danger">{expirationDateError}</Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label className="formLabel" column sm="4">Enter CVV *</Form.Label>
          <Col sm="7">
            <Form.Control
              type="password"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
              className='input-field'
              required
            />
             <Form.Text className="text-danger">{cvvError}</Form.Text>
          </Col>
        </Form.Group>
      </div>
    );
  } else if (paymentMethod === 'upi') {
    paymentForm = (
      <div>
        <p className="para_bold">Enter UPI Details</p>
        <Form.Group as={Row}>
          <Form.Label className="formLabel" column sm="4">Enter Your UPI ID *</Form.Label>
          <Col sm="7">
            <Form.Control
              type="text"
              placeholder="UPI ID"
              value={upiDetails}
              onChange={handleupiDetailsChange}
              className='input-field'
              required
            />
             <Form.Text className="text-danger">{upiIdError}</Form.Text>
          </Col>
        </Form.Group>
      </div>
    );
  }

  const isButtonDisabled = !amountToAdd || !paymentMethod || amountError !== ''|| (
    (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') && (
      !cardDetails.cardNumber || !cardDetails.cardHolder ||
      !cardDetails.expirationDate || !cardDetails.cvv || cardNumberError !== '' ||
       cvvError !== '' || expirationDateError !== '' 
  ) || (
    paymentMethod === 'upi' && !upiDetails || upiIdError !== ''
  ));

  return (
    <>
   <NavBar heding="Add Amount"/>
<div className="header">
            <h1>Add Amount</h1>
          </div>
    <Container className="balance-add-page mx-auto">
      <Row>
        <Col>
          
          <Card className="payment">
            <Card.Body>
              <p className="para_bold">Current Balance: ${balance}</p>
              <div className="add-form">
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label className="formLabel" column sm="4">Enter Amount to Add *</Form.Label>
                    <Col sm="7">
                      <Form.Control
                        type="number"
                        placeholder="Amount to Add"
                        value={amountToAdd}
                        onChange={handleAmountChange}
                        className='input-field'
                        required
                      />
                       <Form.Text className="text-danger">{amountError}</Form.Text>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label className="formLabel" column sm="4">Select Payment Method *</Form.Label>
                    <Col sm="7">
                      <Form.Control
                        as="select"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        className='input-field'
                        required
                      >
                        <option value="" disabled>Select Payment Method</option>
                        <option value="debitCard">Debit Card</option>
                        <option value="upi">UPI</option>
                        <option value="creditCard">Credit Card</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  {paymentForm}
                </Form>
                <Button onClick={handleAddBalance} className="buttonNatwest" disabled={isButtonDisabled}>
                  Add Amount
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default BalanceAddPage;