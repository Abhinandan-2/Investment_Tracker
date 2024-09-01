import React from 'react';
import { Box, Typography } from '@mui/material';
import conclusionImage from '../../assets/ESG-investing-capabilities-header.jpg';
import './Esg.css'
function EsgConclusion() {
  return (
    <Box 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${conclusionImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white', 
        padding: '50px 0',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom style={{ lineHeight: '1.4' }}>
        The world is evolving, and with it, the standards by which we measure business success.
      </Typography>
      <Typography variant="h6" align="center" style={{ lineHeight: '1.3' }}>
        ESG is no longer a sideline but front and center in evaluating a company's future viability and value. As we move forward, embracing ESG will be synonymous with embracing the future.
      </Typography>
    </Box>
  );
}

export default EsgConclusion;
