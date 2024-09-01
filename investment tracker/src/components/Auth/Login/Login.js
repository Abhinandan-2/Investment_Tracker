import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container, Paper, Button, Grid, InputAdornment, IconButton, FormControlLabel, Link } from '@mui/material';
import { styled } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image1 from '../../../assets/images/image1.jpg'
import { TextFieldStyled } from "../../TextFieldStyled";
import { toast } from 'react-toastify';
import { useUser } from "../../../context/UserContext";
import user_api from "../../../APIs/user-api";

const SubmitButton = styled(Button)({
    marginTop: '16px',
});

// --------------Function Starts here----------
function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {setUser} = useUser();
    const [showPassword, setShowPassword] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    // --------------Event defines here----------

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleSubmit = async (e) => {
        console.warn(formData);
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/authentication', formData);
            if (response.status === 200) {
                console.warn(response.data);
                localStorage.setItem('jwt', response.data.jwt);
                setUser(response.data.user);
                navigate('/dashboard');
                toast.success('Successfully Logged in!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeButton: false,
                    onClose: () => {
                    },
                });
            } else {
                console.error('Login failed:', response);
                toast.error('Login failed. Please try again.', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeButton: false,
                });
            }
        } catch (error) {
            // Handle login errors, show error notification if necessary
            console.error('Login failed:', error);
            toast.error('Login failed. Please try again.', { position: 'top-right' });
        }
    }


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const navigate = useNavigate();
    const handleSignupClick = () => {
        console.warn("Link Clciked");
        navigate('/signup');
    };

    const handleAccountRecoveryClick = () => {
        navigate('/account-recovery');
    }

    const handleGoHome = () => {
        navigate('/');
    }

    // -----------------------return statement starts here-------------------------------
    return (

        <div style={{ position: 'relative', marginBottom: '16px' }}>
            {/* Simple Div for Background */}
            <div style={{ height: '120px', backgroundColor: '#5a287d' }}></div>
            <Container maxWidth="md" style={{ position: 'relative', marginTop: '-80px' }}>
                <Button variant="contained" onClick={handleGoHome} style={{ backgroundColor: 'white', color: '#5a278d' }}><ArrowBackIcon style={{ marginRight: "8px" }} />Go back to HOME</Button>
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
                        </Grid>


                        {/* Right Section - Login Form */}
                        <Grid item xs={12} sm={6}>
                            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '16px', justifyContent: 'center' }}>
                                <Typography variant="h4" style={{ marginRight: '8px' }}>
                                    Login
                                </Typography>
                                <LockIcon fontSize="large" style={{ fontSize: 36 }} />
                            </div>

                            <form onSubmit={handleSubmit} style={{ borderBottom: '1px solid gray', paddingBottom: '16px' }}>
                                <TextFieldStyled
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    style={{ marginBottom: '28px' }}

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
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),

                                    }}
                                />

                                <SubmitButton variant="contained" type="submit" fullWidth startIcon={<HowToRegIcon />} style={{ backgroundColor: '#5a287d', color: '#ffffff' }}>
                                    Login
                                </SubmitButton>

                                {invalidCredentials && (
                                    <Typography variant="body2" color="error" style={{ marginTop: '8px', textAlign: 'center' }}>
                                        Invalid credentials. Please try again
                                    </Typography>
                                )}

                                {/* -----------------This is a account recovery section-------------------            */}
                                <Grid container item xs={12} alignItems="center" mt={3} justifyContent="center">
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer'
                                        }}
                                        onClick={handleAccountRecoveryClick}
                                    >
                                        {/* <Link underline="none" variant="body1" style={{ marginRight: '4px' }}>
                                            Forgot Password
                                        </Link> */}
                                    </div>
                                </Grid>
                            </form>


                            {/* -------------New User------------- */}
                            <Grid container item xs={12} alignItems="center" mt={3} justifyContent="center">
                                <Typography variant="body1">New User?</Typography>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleSignupClick}
                                >
                                    <Link variant="body1" style={{ marginRight: '4px' }}>
                                        Click Here to Signup
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
export default Login;
