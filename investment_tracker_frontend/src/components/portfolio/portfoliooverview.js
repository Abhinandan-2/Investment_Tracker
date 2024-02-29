import React, { useState } from 'react';
import { 
  Container, Card, CardContent, Typography, Box, Button, Grid 
} from '@mui/material';
import { Link } from 'react-router-dom';

function PortfolioOverview() {
  const [portfolios, setPortfolios] = useState([
      {
          type: 'Conservative',
          stocks: [
              { name: 'Stock A', price: 100 },
              { name: 'Stock B', price: 120 }
          ]
      },
      {
          type: 'Aggressive',
          stocks: [
              { name: 'Stock C', price: 140 },
              { name: 'Stock D', price: 160 }
          ]
      }
  ]);

  return (
      <Container>
          <Box sx={{ backgroundColor: '#3c1053', color: 'white', padding: '1rem', borderRadius: '5px', margin:'10px' }}>
            <Typography variant="h4">Your Investment Portfolios</Typography>
          </Box>

          {portfolios.map((portfolio, index) => (
              <Box key={index} sx={{ marginBottom: '2rem' }}>
                  <Typography variant="h6" gutterBottom>{portfolio.type}</Typography>
                  {portfolio.stocks.map((stock, sIndex) => (
                      <Card key={sIndex} sx={{ margin: '1rem 0', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
                          <CardContent>
                            <Grid container justifyContent="space-between">
                              <Typography variant="h6">{stock.name}</Typography>
                              <Typography variant="body1">{`Price: $${stock.price}`}</Typography>
                            </Grid>
                          </CardContent>
                      </Card>
                  ))}
              </Box>
          ))}
          <Button 
            variant="outlined" 
            color="primary" 
            component={Link} 
            to="/" 
            sx={{ marginTop: '2rem' }}
          >
            Back to Create Portfolio
          </Button>
      </Container>
  );
}

export default PortfolioOverview;
