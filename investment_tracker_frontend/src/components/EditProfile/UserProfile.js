import React, { useDebugValue, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './UserProfile.css'
import { Button, Card, Form, Container, Row, Col, Collapse } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../axiosInstance";
import { toast } from 'react-toastify';
import user_api from "../../APIs/user-api";
function User() {

  const [balance, setBalance] = useState();

  useEffect(()=>{

    axiosInstance.get(`${user_api}/${userData.id}`)
    .then((response)=>{
      setBalance(response.data.currentBalance);
    })

  },[balance]);
  const {userData} =useUser();
  const [user, setUser] = useState();
  const [submit, setSubmit] = useState(true);
  console.warn(userData);
  const [userDetails, setUserDetails] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password:'',
    phoneNumber: userData.phoneNumber,
    dob: userData.dob,
    address: userData.address,
    securityQuestion: userData.securityQuestion,
    securityAnswer: userData.securityAnswer,
    currentBalance:balance
  });
  

  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dobError, setDobError] = useState('');


  const handleUserDetailsChange = (event) => {
    const { name, value } = event.target;

    if (name === 'phoneNumber') { // Validation for card number
      const cleanedValue = value.replace(/\D/g, ''); // Remove non-digit characters
      setUserDetails({
        ...userDetails,
         phoneNumber: cleanedValue,
      });
      if (cleanedValue.length === 10) {
        setPhoneNumberError('');
      } else {
        setPhoneNumberError('Please enter a valid phone number');
      }
    }
    else if (name =='email'){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setUserDetails({
        ...userDetails,
        email : value,
      });
      if (emailRegex.test(value)){
        setEmailError('');
      }
      else{
        setEmailError('Please enter a valid email');
      }
    }
    else if (name =='password'){
      // const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
      setUserDetails({
        ...userDetails,
        password : value,
      });
      // if (passwordRegex.test(value)){
      if(value.length>=8){
        setPasswordError('');
      }
      else{
        setPasswordError('Password includes at least 8 characters.');
      }
    }
    else if(name == 'dob'){
      const dobRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(\d{4})$/;
      setUserDetails({
        ...userDetails,
        dob : value,
      });
      if (dobRegex.test(value)){
        setDobError('');
      }
      else{
        setDobError('Please enter a valid date (DD-MM-YYYY)');
      }

    }
    else {
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }
  };
  const handelOnSubmit = async (event) => {
    event.preventDefault();
    console.warn(userDetails);
  
    try {
      const response = await axiosInstance.put(`${user_api}/${userData.id}`, userDetails);
      console.warn(response.status);
  
      if (response.status === 200) {
        setSubmit(!submit);
        toast.success('Profile updated!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeButton: false,
          onClose: () => {
            // Handle successful profile update here, if needed
          },
        });
      } else {
        toast.error('Profile Updation Failed', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeButton: false,
          onClose: () => {
            // Handle failed profile update here, if needed
          },
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle the error here, if needed
    }
    axiosInstance.patch(`${user_api}/balance/${userData.id}`,{
      "currentBalance" : balance
    }).then((response)=>{
    })
  };

const isButtonDisabled =
  phoneNumberError !== '' ||
  emailError !== '' ||
  passwordError !== ''||
  dobError !== '' ;

  return (
    <>

<NavBar heding= "Profile"/>
      <Container style={{ marginTop: "50px" }}>
        <Card md="8">
          <Card.Header
            style={{
              backgroundColor: "#5a287d",
              color: "white",
              textAlign: "center",
              paddingTop: "20px",
            }}
          >
            <Card.Title as="h4">Edit Profile</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handelOnSubmit}>
              <Row>
                  <Col className="pr-1" md="6">
                  <Form.Group>
                    <label className="lable-style">First Name *</label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={userDetails.firstName}
                      onChange={handleUserDetailsChange}
                      defaultValue={userDetails.firstName}
                      placeholder="First Name"
                      className='input-field'
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label className="lable-style">Last Name *</label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={userDetails.lastName}
                      onChange={handleUserDetailsChange}
                      defaultValue={userDetails.lastName}
                      placeholder="Last Name"
                      className='input-field'
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label className="lable-style">Phone Number *</label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={userDetails.phoneNumber}
                      onChange={handleUserDetailsChange}
                      defaultValue={userDetails.phoneNumber}
                      placeholder="Phone Number"
                      className='input-field'
                    ></Form.Control>
                    <Form.Text className="text-danger">{phoneNumberError}</Form.Text>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label className="lable-style">Date of Birth (DD-MM-YYYY)*</label>
                    <Form.Control
                      name="dob"
                      value={userDetails.dob}
                      onChange={handleUserDetailsChange}
                      defaultValue={userDetails.dob}
                      placeholder="Date of Birth (DD-MM-YYYY)"
                      // type="date"
                      type = "text"
                      className='input-field'
                    ></Form.Control>
                    <Form.Text className="text-danger">{dobError}</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label className="lable-style">Email *</label>
                    <Form.Control
                      name="email"
                      value={userDetails.email}
                      onChange={handleUserDetailsChange}
                      defaultValue={userDetails.email}
                      placeholder="Email"
                      type="email"
                      className='input-field'
                      readOnly
                    ></Form.Control>
                    <Form.Text className="text-danger">{emailError}</Form.Text>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label className="lable-style">Password *</label>
                    <Form.Control
                      name="password"
                      value={userDetails.password}
                      onChange={handleUserDetailsChange}
                      defaultValue={userDetails.password}
                      placeholder="Password"
                      type="password"
                      className='input-field'
                      required
                    ></Form.Control>
                    <Form.Text className="text-danger">{passwordError}</Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label className="lable-style">Security Questions *</label>
                    <Form.Control
                      as="select"
                      value={userDetails.securityQue}
                      onChange={handleUserDetailsChange}
                      name="securityQue"
                      className='input-field'
                      defaultValue={userDetails.securityQue}
                    >
                      <option value="" disabled>Select Security Questions</option>
                      <option value="maidenName">What is your mother's maiden name? </option>
                      <option value="firstPet">What was the name of your first pet?</option>
                      <option value="bornCity">In which city were you born? </option>
                      <option value="favMovie"> What is your favorite book or movie?</option>
                      <option value="bestFriend">What is the name of your childhood best friend? </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label className="lable-style">Security Answer *</label>
                    <Form.Control
                      name="securityAns"
                      value={userDetails.securityAns}
                      onChange={handleUserDetailsChange}
                      defaultValue={userDetails.securityAnswer}
                      placeholder="Security Answer"
                      className='input-field'
                      type="password"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <Form.Group>
                    <label className="lable-style">Address *</label>
                    <Form.Control
                      name="address"
                      value={userDetails.address}
                      onChange={handleUserDetailsChange}
                      defaultValue={userDetails.address}
                      type="text"
                      placeholder="Address"
                      className='input-field'
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <div style={{display:'flex', justifyContent:'space-between'}}>
              <Button style={{marginLeft:'0'}} className="buttonNatwest" type="submit" disabled = {isButtonDisabled}>Update Profile </Button>
              <h4 style={{color:'white', border:'2px solid #5a287d', padding:'8px', borderRadius:'12px' , backgroundColor :'#5a287d' }}>Avaialable Balance: ${balance}</h4>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default User;