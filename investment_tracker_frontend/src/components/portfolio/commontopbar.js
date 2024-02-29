import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CommonTopBar = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px 20px" borderBottom="1px solid #ccc">
      <Button variant="contained" color="primary" style={{ background: '#5a287d' }} onClick={() => navigate('/dashboard/portfolio')}> 
        Create
      </Button>
      <Button variant="outlined" className="outlined-button" onClick={() => navigate('/dashboard/savedportfolio')}>
        Show your portfolios
      </Button>
    </Box>
  );
};

export default CommonTopBar;
