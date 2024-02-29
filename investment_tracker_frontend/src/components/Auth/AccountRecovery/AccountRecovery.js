import React, { useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Grid,
    Paper,
    Button,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';
import { Navigate, useNavigate } from 'react-router-dom';
import { TextFieldStyled, StyledFormControl } from "../../TextFieldStyled";
import user_api from '../../../APIs/user-api';
const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "In what city were you born?",
];

const StyledPaper = styled(Paper)({
    padding: '20px',
    textAlign: 'center',
});

const StyledButton = styled(Button)({
    marginTop: '16px',
    backgroundColor: '#5a287d',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: '#452665',
    },
    marginRight: '8px',
});

function AccountRecovery() {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [user, setUser] = useState(null);
    const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${user_api}?email=${searchInput}`);
            if (response.data.length > 0) {
                const foundUser = response.data[0];
                setUser(foundUser);
                setErrorMessage('');
            } else {
                setErrorMessage('Email not found in the database');
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleChangePassword = async () => {
        try {
            if (
                selectedSecurityQuestion === user.securityQuestion &&
                securityAnswer === user.securityAnswer
            ) {
                await axios.put(`http://localhost:3000/users/${user.id}`, {
                    ...user,
                    password: newPassword,
                    confirmPassword: newPassword,
                });
                setIsPasswordChanged(true);
                setErrorMessage('');
            } else {
                setErrorMessage('Incorrect security question or answer');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setErrorMessage('Error updating password. Please try again later.');
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <StyledPaper elevation={3}>
                    <Typography variant="h5" gutterBottom>
                        Account Recovery
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Enter your email to recover your account.
                    </Typography>
                    <form onSubmit={handleSearch}>
                        <StyledFormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
                            <TextFieldStyled
                                id="searchInput"
                                name="searchInput"
                                label="Email"
                                required
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </StyledFormControl>
                        {user ? (
                            <div style={{ marginTop: '16px', textAlign: 'left' }}>
                                <TextFieldStyled
                                    select
                                    label="Select Security Question"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={selectedSecurityQuestion}
                                    onChange={(e) => setSelectedSecurityQuestion(e.target.value)}
                                    style={{ marginBottom: '16px' }}
                                >
                                    {securityQuestions.map((question) => (
                                        <MenuItem key={question} value={question}>
                                            {question}
                                        </MenuItem>
                                    ))}
                                </TextFieldStyled>
                                <TextFieldStyled
                                    id="securityAnswer"
                                    name="securityAnswer"
                                    label="Security Answer"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={securityAnswer}
                                    onChange={(e) => setSecurityAnswer(e.target.value)}
                                    style={{ marginBottom: '16px' }}
                                />
                                <TextFieldStyled
                                    id="newPassword"
                                    name="newPassword"
                                    label="New Password"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    style={{ marginBottom: '16px' }}
                                />
                                <StyledButton variant="contained" onClick={handleChangePassword} fullWidth>
                                    Change Password
                                </StyledButton>
                            </div>
                        ) : (
                            <div style={{ marginBottom: '16px' , display:'flex', justifyContent:'right'}} >
                                <StyledButton variant="contained" type="submit">
                                    Search
                                </StyledButton>
                                <StyledButton variant="outlined" onClick={() => navigate('/login')}>
                                    Cancel
                                </StyledButton>
                            </div>
                        )}
                    </form>
                    {errorMessage && (
                        <Typography variant="body1" gutterBottom style={{ color: 'red', marginTop: '16px' }}>
                            {errorMessage}
                        </Typography>
                    )}
                    {isPasswordChanged && (
                        <Typography variant="body1" gutterBottom style={{ marginTop: '16px' }}>
                            Password changed successfully!
                        </Typography>
                    )}
                </StyledPaper>
            </Grid>
        </Grid>
    );
}

export default AccountRecovery;
