import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import './Esg.css'
function EsgBusinessImperative() {
  return (
    <Box bgcolor="white" p={5}>
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={6} >
          <Typography variant="h4" fontWeight="bold">
            The Business Imperative of ESG
          </Typography>
          <Typography mt={2}>
            Embracing ESG principles is not just about 'doing good.' It's about achieving long-term sustainability and financial success:
          </Typography>
        </Grid>
        
        <Grid item xs={6}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Paper elevation={2}  style={{ padding: '15px', borderRadius: '10px', color: '#3c1053', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Box bgcolor="#3c1053" width={20} height={20} display="flex" alignItems="center" justifyContent="center" borderRadius="10%" color="white">
              💲
              </Box>
              
              <Typography>Financial Performance: ESG-oriented firms often outperform their counterparts in the long run.</Typography>
            </Paper>
            <Paper elevation={2} style={{ padding: '15px', borderRadius: '10px', color: '#3c1053', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Box bgcolor="#3c1053" width={20} height={20} display="flex" alignItems="center" justifyContent="center" borderRadius="10%" color="white">
              ✔️
              </Box>
             
              <Typography>Stakeholder Trust: ESG fosters trust with employees, customers, and stakeholders, crucial in today's transparent world.</Typography>
            </Paper>
            <Paper elevation={2} style={{ padding: '15px', borderRadius: '10px', color: '#3c1053', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Box bgcolor="#3c1053" width={20} height={20} display="flex" alignItems="center" justifyContent="center" borderRadius="10%" color="white">
                ⚠️ 
              </Box>
             
              <Typography>Companies that adhere to ESG principles tend to have fewer regulatory, legal, and reputational risks.</Typography>
            </Paper>
            
        
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EsgBusinessImperative;
