import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import CommonTopBar from './commontopbar';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';

function SavedPortfolioPage() {
  const navigate = useNavigate();
  const location = useLocation();  // Use the location hook to get the state

  // State for portfolios
  const [portfolios, setPortfolios] = useState([]);

  // State for delete dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8084/api/users/portfolios')
      .then((response) => {
        console.log("Fetched Portfolios:", response.data);
        if (Array.isArray(response.data)) {
          setPortfolios(response.data);
        } else {
          setPortfolios([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching portfolios:', error);
      });
  }, []);

  const handleDeleteAll = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteAll = () => {
    axios.delete('http://localhost:8084/api/users/portfolios/deleteAll')
      .then(response => {
        console.log('All portfolios deleted successfully');
        setPortfolios([]);
        setIsDeleteDialogOpen(false);
      })
      .catch(error => {
        console.error('Error deleting all portfolios:', error);
        setIsDeleteDialogOpen(false);
      });
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
       <NavBar heding="Protfolio"/>
      <CommonTopBar />
      <div className="container" style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '10px' }}>
          Created Portfolios
        </Typography>
        <Typography variant="h6" style={{ marginBottom: '30px' }}>
          You have {portfolios.length} saved portfolios
        </Typography>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            border: '1px solid #e0e0e0',
            padding: '10px 20px',
            borderRadius: '25px',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Avatar style={{ backgroundColor: '#3f51b5', marginRight: '10px' }}>i</Avatar>
          <Typography variant="body1" style={{ flexGrow: 1 }}>
            Invest in your ideas — Create a portfolio of your own stock picks. Invest immediately or save it for later
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard/portfolio')}
            style={{ borderRadius: '25px', background: '#5a287d' }}
          >
            Create Portfolio
          </Button>
        </div>

        {/* Display the portfolios fetched from the backend */}
        {portfolios.map((portfolio) => (
          <Card style={{ marginBottom: '20px', borderRadius: '10px' }} key={portfolio.name}>
            <CardContent>
              <Typography variant="h5">{portfolio.portfolioName}</Typography>

              <List>
                {portfolio.stocks.map((stock, index) => (
                  <ListItem key={index}>
                    {stock.stockName} - ${stock.buyPrice}
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" style={{ marginTop: '10px' }}>
                Total Portfolio Value: ${calculateTotalPortfolioValue(portfolio.stocks)}
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button variant="contained" color="primary" style={{ background: '#5a287d' }}>
                Invest Now
              </Button>
            </CardActions> */}
          </Card>
        ))}

        {/* Delete All Portfolios Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteAll}
          style={{ borderRadius: '25px' }}
        >
          Delete All Portfolios
        </Button>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete all portfolios?
          </DialogContent>
          <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteAll} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

function calculateTotalPortfolioValue(stocks) {
  return stocks.reduce((total, stock) => {
    const price = stock.buyPrice || 0;
    const quantity = stock.quantity || 1;
    return total + price * quantity;
  }, 0);
}

export default SavedPortfolioPage;

