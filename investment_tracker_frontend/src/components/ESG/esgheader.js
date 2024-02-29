import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import esgGraphic from '../../assets/ESG-graphic-2.png';


export default function ESGHeader() {
  return (
    <Box bgcolor="white" color="#3c1053" p={5}>
      <Grid container alignItems="center" spacing={3}>
        
        <Grid item xs={6}>
          <Typography variant="h4">
            What is ESG?
          </Typography>
          <Typography>
            ESG stands for Environmental, Social, and Governance. These are the three primary factors that measure the sustainability and ethical impact of an investment in a company or business.
          </Typography>
        </Grid>
        
        <Grid item xs={6}>
          <img src={esgGraphic} alt="ESG" style={{ maxWidth: '100%', borderRadius: '10px' }} />
        </Grid>

      </Grid>
    </Box>
  );
}
