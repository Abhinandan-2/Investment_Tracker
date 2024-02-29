import React from 'react';
import { Typography, Box, Container, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#5a287d', color: 'white', py: 4, marginTop:'24px' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom className="footer-heading">
              About Us
            </Typography>
            <Typography variant="body2">
              Investment Tracker is a platform to help you manage your investments and make informed decisions.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom className="footer-heading">
              Security Terms
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover" className="footer-link">
                Privacy Policy
              </Link>
              <br/>
              <Link href="#" color="inherit" underline="hover" className="footer-link">
                Terms of Service
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom className="footer-heading">
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: <span className="footer-email">info@investmenttracker.com</span>
              <br />
              Phone: <span className="footer-phone">+1 (123) 456-7890</span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
