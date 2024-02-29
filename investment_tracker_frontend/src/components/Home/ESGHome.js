import React from 'react';
import { Typography, Box, Grid, Button } from '@mui/material';
import ESGImage from '../../assets/images/ESGImage.jpg';

const ESGHome = () => {
  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: 1300,
        margin: '0 auto',
        border: '2px solid #5a287d',
        borderRadius: '10px',
        marginTop: '20px',
        backgroundColor: '#5a278d'
      }}
      id="esg"
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Section: Content */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: '100%',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'white', marginBottom: 2 }}>
              Environmental, Social, and Governance (ESG) Education
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2, color: 'white', textDecoration:'underline' }}>
              Learn about responsible investing and the impact of Environmental, Social, and Governance
              factors on investment decisions.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2, color: 'white' }}>
              Our ESG education platform provides valuable insights into ethical investing,
              sustainable practices, and socially responsible choices.
            </Typography>
            <Button variant="contained" sx={{
              backgroundColor: 'white', color: '#5a287d', marginTop: 2, '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white'// Change to your desired lighter shade color
              },
            }}>
              Explore More
            </Button>
          </Box>
        </Grid>

        {/* Right Section: Image */}
        <Grid item xs={12} md={5}>
          <img
            src={ESGImage}
            alt="ESG Education"
            style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ESGHome;
