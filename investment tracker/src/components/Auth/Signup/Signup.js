import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Container, Paper, Button, Grid, InputLabel, Select, MenuItem, InputAdornment, IconButton, FormControlLabel, Checkbox, Link } from '@mui/material';
import { styled } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image1 from '../../../assets/images/image1.jpg';
import { StyledFormControl, TextFieldStyled } from "../../TextFieldStyled";


const SubmitButton = styled(Button)({
    marginTop: '16px',
});

// --------------Function Starts here----------
function Signup() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: '',
        phoneNumber: '',
        address: '',
        securityQuestion: '',
        securityAnswer: '',
        currentBalance: 0,
    });

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        securityQuestion: '',
        securityAnswer: '',
        agreeTerms:'',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const securityQuestions = [
        'What is your mother\'s maiden name?',
        'What was the name of your first pet?',
        'In what city were you born?',
    ];

    // --------------Event defines here----------
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });


        // -----------Input Error Handling Here--------
        if (name === 'firstName' || name === 'lastName') {
            const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>0-9]/;
            if (specialCharactersRegex.test(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: 'Numbers and Special characters are not allowed.',
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                });
            }
        } else if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: 'Invalid email address.',
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                });
            }
        } else if (name === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: 'Password should have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.',
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                });
            }
        }else if (name === 'dob') {
            const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/ // MM/DD/YYYY format
            if (!dobRegex.test(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: 'Invalid format! Use MM/DD/YYYY format.',
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                });
            }
        }

        else if (name === 'phoneNumber') {
            const phoneNumberRegex = /^\d{10}$/;
            if (!phoneNumberRegex.test(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: 'Phone number must be 10 digits long and only contain digits.',
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                });
            }
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreeTerms) {
            setFormErrors({
                ...formErrors,
                agreeTerms: 'You must agree to the terms & Conditions',
            })
            return; // Prevent form submission if terms are not agreed
        }else{
            setFormErrors({
                ...formErrors,
                agreeTerms: '',
            })
        }

        if (confirmPassword != formData.password) {
            setFormErrors({
                ...formErrors,
                confirmPassword: 'Password does not match',
            });
            return; // Prevent form submission if terms are not agreed
        }else{
            setFormErrors({
                ...formErrors,
                confirmPassword: '',
            });
        }

        try {
            const response = await axios.post("http://localhost:3001/api/register", formData);
            console.warn(response.status);
            if (response.status === 200) {
                navigate('/login');
                toast.success('Account created successfully!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeButton: false,
                    onClose: () => {
                    },
                });

                // Reset the form data if needed
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    dob: '',
                    phoneNumber: '',
                    address: '',
                    securityQuestion: '',
                    securityAnswer: '',
                    agreeTerms: false,
                })
            } else {
                console.error('Signup failed:', response);
                toast.error('Signup failed. Please try again.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeButton: false,
                });
            }
        } catch (error) {
            // Handle signup errors, show error notification if necessary
            console.error('Signup failed:', error);
            toast.error('Signup failed. Please try again.', { position: 'top-right' });
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
        setFormErrors({
            ...formErrors,
            agreeTerms: '',
        });
    }

    const handleConfirmPassword =(e) =>{
        setConfirmPassword(e.target.value);
    }

    const handleLoginClick = () => {
        console.warn("Link Clciked");
        navigate('/login');
    };

    const handleGoHome=()=>{
        navigate('/');
    }


    // -----------------------return statement starts here-------------------------------
    return (

        <div style={{ position: 'relative', marginBottom: '16px' }}>

            {/* Simple Div for Background */}
            <div style={{ height: '120px', backgroundColor: '#5a287d' }}></div>
            <Container style={{ position: 'relative', marginTop: '-80px', width: 'full' }}>
                <Button variant="contained" onClick={handleGoHome} style={{backgroundColor:'white', color:'#5a278d'}}><ArrowBackIcon style={{marginRight:"8px"}}/>Go back to HOME</Button>
                <Paper style={{ padding: 18, marginTop: 20, border: '1px solid #ccc' }}>
                    <Grid container spacing={2} >
                        {/* Left Section - Investment Details */}
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            style={{
                                position: 'relative',
                                minHeight: '300px', // Set a minimum height for the left section
                                overflow: 'hidden',
                                // borderRadius: '10px',
                                borderRight: '1px solid #c4b6cf',
                            }}
                        >
                            <img
                                src={Image1} // Use the imported image as the source
                                alt="Investment"
                                style={{
                                    width: '98%',
                                    height: '100%',
                                    objectFit: 'cover',

                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center',
                                    color: 'white',
                                    zIndex: 1,
                                    width: '80%', // Set the width of the content relative to the image
                                }}
                            >
                                <Typography variant="h4" gutterBottom>
                                    Secure Investment Platform
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Explore secure investment opportunities with us. Lorem ipsum dolor sit amet
                                </Typography>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                    <LockIcon style={{ fontSize: 40, marginRight: 10 }} />
                                    <span>Secure Investments</span>
                                </div>
                            </div>
                        </Grid>


                        {/* Right Section - Login Form */}
                        <Grid item xs={12} sm={6}>

                            <form onSubmit={handleSubmit}>
                                <Grid container justifyContent="center" spacing={2}>
                                    <Grid item xs={12} sm={6} >
                                        <TextFieldStyled
                                            id="firstName"
                                            name="firstName"
                                            label="First Name"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            error={!!formErrors.firstName}
                                            helperText={formErrors.firstName}
                                        />
                                    </Grid>


                                    <Grid item xs={12} sm={6}>
                                        <TextFieldStyled
                                            id="lastName"
                                            name="lastName"
                                            label="Last Name (Optional)"
                                            variant="outlined"
                                            fullWidth
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            error={!!formErrors.lastName}
                                            helperText={formErrors.lastName}
                                        />
                                    </Grid>
                                </Grid>

                                <TextFieldStyled
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={!!formErrors.email}
                                    helperText={formErrors.email}
                                />


                                <TextFieldStyled
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={!!formErrors.password}
                                    helperText={formErrors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextFieldStyled
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleConfirmPassword}
                                    error={!!formErrors.confirmPassword}
                                    helperText={formErrors.confirmPassword}
                                />

                                <Grid container justifyContent="center" spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldStyled
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            label="Phone Number"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            error={!!formErrors.phoneNumber}
                                            helperText={formErrors.phoneNumber}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextFieldStyled
                                            id="dob"
                                            name="dob"
                                            variant="outlined"
                                            label="DOB (DD/MM/YYYY)"
                                            fullWidth
                                            required
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            error={!!formErrors.dob}
                                            helperText={formErrors.dob}
                                        />
                                    </Grid>
                                </Grid>

                                <TextFieldStyled
                                    id="address"
                                    name="address"
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    error={!!formErrors.address}
                                    helperText={formErrors.address}
                                />


                                <Grid container justifyContent="center" spacing={2}>
                                    {/* ... (other form fields) */}
                                    <Grid item xs={12} sm={6}>
                                        <StyledFormControl fullWidth variant="outlined" required>
                                            <InputLabel htmlFor="securityQuestion">Security Question</InputLabel>
                                            <Select
                                                label="Security Question"
                                                id="securityQuestion"
                                                name="securityQuestion"
                                                value={formData.securityQuestion}
                                                onChange={handleInputChange}
                                                error={!!formErrors.securityQuestion}
                                            >
                                                <MenuItem value="" disabled>Select a question</MenuItem>
                                                {securityQuestions.map((question, index) => (
                                                    <MenuItem key={index} value={question}>{question}</MenuItem>
                                                ))}
                                            </Select>
                                        </StyledFormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldStyled
                                            fullWidth
                                            label="Security Answer"
                                            variant="outlined"
                                            required
                                            value={formData.securityAnswer}
                                            onChange={handleInputChange}
                                            name="securityAnswer"
                                            error={!!formErrors.securityAnswer}
                                            helperText={formErrors.securityAnswer}
                                        />
                                    </Grid>
                                    {/* ... (other form fields) */}
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.agreeTerms}
                                                onChange={handleCheckboxChange}
                                                color="primary"
                                            />
                                        }
                                        label="I have read and agree to the terms and conditions"
                                    />
                                    {formErrors.agreeTerms && (
                                        <Typography variant="body2" color="error">
                                            {formErrors.agreeTerms}
                                        </Typography>
                                    )}
                                </Grid>

                                <SubmitButton variant="contained" type="submit" fullWidth startIcon={<HowToRegIcon />} style={{ backgroundColor: '#5a287d', color: '#ffffff' }}>
                                    SignUp
                                </SubmitButton>
                            </form>


                            {/* -------------Already have an account------------- */}
                            <Grid container item xs={12} alignItems="center" mt={1}>
                                <Typography variant="body1">Already have an Account ?</Typography>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleLoginClick}
                                >
                                    <Link variant="body1" style={{ marginRight: '4px' }}>
                                        Click Here to Login
                                    </Link>
                                    <LoginIcon style={{ verticalAlign: 'middle', color: '#3f51b5' }} />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );

}
export default Signup;