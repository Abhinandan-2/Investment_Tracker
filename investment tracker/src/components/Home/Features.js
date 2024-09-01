import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const Features = () => {
  const featureItems = [
    {
      icon: <StarIcon fontSize="large" sx={{ color: '#5a278d' }} />,
      title: 'Real-time Stock Prices',
      description: 'View up-to-the-minute live prices of all available stocks.',
    },
    {
      icon: <SecurityIcon fontSize="large" sx={{ color: '#5a278d' }} />,
      title: 'Secure Transactions',
      description: 'Ensure your transactions are safe and protected with advanced security measures.',
    },
    {
      icon: <EqualizerIcon fontSize="large" sx={{ color: '#5a278d' }} />,
      title: 'Advanced Analytics',
      description: 'Access in-depth analytics and insights for informed investment decisions.',
    },
    {
      icon: <MonetizationOnIcon fontSize="large" sx={{ color: '#5a278d' }} />,
      title: 'Portfolio Management',
      description: 'Build and manage multiple portfolios tailored to your investment strategies.',
    },
    {
      icon: <LocalLibraryIcon fontSize="large" sx={{ color: '#5a278d' }} />,
      title: 'Educational Resources',
      description: 'Explore educational materials and resources to enhance your investment knowledge.',
    },
    {
      icon: <ShowChartIcon fontSize="large" sx={{ color: '#5a278d' }} />,
      title: 'ESG Ratings',
      description: 'Evaluate stocks based on Environmental, Social, and Governance (ESG) criteria.',
    },
  ];

  return (
    <Box id="features" sx={{ background: '#f2ecfd', py: 6, px: 2 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: '#5a287d' }}>
        Key Features and Benefits
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {featureItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                background: 'white',
                color: 'black',
                border: '1px solid #ccc', // Add border
                borderRadius: 0, // Remove corner radius
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Add shadow
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginLeft: 2,
                marginRight: 2,
                transition: '0.3s',
                '&:hover': {
                  boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)', // Change shadow on hover
                },
              }}
            >
              {item.icon}
              <Typography variant="h6" sx={{ my: 2 }}>
                {item.title}
              </Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;