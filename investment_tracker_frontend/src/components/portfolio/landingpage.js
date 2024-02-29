import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import illustration1 from '../../assets/illustration1.png';
import CommonTopBar from './commontopbar';
import axios from 'axios';
import { Navbar,Nav } from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import NavBar from '../NavBar/NavBar';

function LandingPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleCreatePortfolio = async () => {
        
        // API call to save the portfolio name
        try {
            const response = await axios.post('http://localhost:8083/api/users/portfolioLists', {
                name: searchTerm
            });
    
            if (response.status === 200) {
                console.log('Successfully saved the portfolio');
            }
        } catch (error) {
            console.error('Error saving the portfolio:', error);
        }
    
        navigate('/dashboard/create-portfolio', { state: { portfolioName: searchTerm } });
    };

    return (
        
        <div>





<NavBar heding ="Portfolio"/>
            <CommonTopBar />
            <Container>
                <Box mt={2}>
                    <Typography variant="h4" gutterBottom>
                        Create Portfolios
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Managed by you
                    </Typography>
                </Box>
                <Grid container spacing={4} mt={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <img src={illustration1} alt="Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{ backgroundColor: '#5a287d', height: '100%' }}>
                        <Box pl={2} paddingBottom={10}>
                            <Typography variant="h5" gutterBottom style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
                                Got a great investment idea?
                            </Typography>
                            <Typography variant="body1" mb={3} style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
                                Add stocks to create and invest in your own portfolio
                            </Typography>
                            <Box width="100%" maxWidth="500px" mb={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Type of portfolio"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: <SearchIcon color="action" />,
                                        style: { color: 'white' }
                                    }}
                                />
                            </Box>
                            <Button variant="contained" color="primary" size="large" style={{ backgroundColor: "#5e10b1" }} onClick={handleCreatePortfolio}>
                                Create Portfolio
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default LandingPage;
