import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import CommonTopBar from './commontopbar';
import axios from 'axios';
import fetchStockData from '../StockMarketOverview/StockData';
import NavBar from '../NavBar/NavBar';
import portfolio_api from '../../APIs/portfolio-api';

function CreatePortfolio() {
  const navigate = useNavigate();
  const location = useLocation(); // Use the location hook to access state
  const { portfolioName: initialPortfolioName } = location.state; // Access portfolioName from state

  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [portfolioName, setPortfolioName] = useState(initialPortfolioName || 'Default Portfolio Name'); // Use initialPortfolioName
  const [stocks, setStocks] = useState([]);
  const [stockInput, setStockInput] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = stocks.reduce((total, stock) => total + stock.price, 0);
    setTotalPrice(newTotalPrice);
  }, [stocks]);

  const handleSearchChange = async (inputValue) => {
    setStockInput(inputValue);

    if (inputValue && inputValue.length >= 3) {
      const stockData = await fetchStockData(inputValue);
      if (stockData) {
        setSearchResults([stockData]);
      } else {
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleAddStock = () => {
    if (selectedStock && !stocks.some((s) => s.symbol === selectedStock.symbol)) {
      setStocks([...stocks, selectedStock]);
      setStockInput('');
      setSelectedStock(null);
    }
  };

  const handleStockSelection = (stock) => {
    setSelectedStock(stock);
    setStockInput(stock.company);
    setSearchResults([]);
  };

  const handleSavePortfolio = async () => {
    const payload = {
      portfolioName: portfolioName,
      stocks: stocks.map((stock) => ({
        stockName: stock.company,
        buyPrice: stock.price,
        quantity: 1,
      })),
    };

    try {
      const response = await axios.post(portfolio_api, payload);
      if (response.status === 200) {
        setStocks([]);
        setPortfolioName('');
        navigate('/dashboard/savedportfolio');
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
    }
  };

  return (
    <div>
      <NavBar heding="Protfolio"/>
      <CommonTopBar />
      <AppBar style={{ backgroundColor: '#3c1053' }} position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Creating New Portfolio
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          {portfolioName}
        </Typography>
        <Divider style={{ marginBottom: '20px' }} />
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Autocomplete
              id="stock-search"
              options={searchResults}
              getOptionLabel={(option) => `${option.company} - $${option.price}`}
              onChange={(_, newValue) => {
                if (newValue) {
                  handleStockSelection(newValue);
                }
                setStockInput('');
                setSearchResults([]);
              }}
              inputValue={stockInput}
              onInputChange={(_, newInputValue) => handleSearchChange(newInputValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search by name or ticker"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              )}
              noOptionsText={''}
            />

            <Button
              variant="contained"
              style={{ margin: '20px 0', backgroundColor: '#5e10b1' }}
              onClick={handleAddStock}
            >
              Add stocks
            </Button>
            {stocks.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Stock Name</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stocks.map((stock) => (
                    <TableRow key={stock.symbol}>
                      <TableCell>{stock.company}</TableCell>
                      <TableCell>${stock.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h6">
                Total Portfolio Price: ₹ {totalPrice}
              </Typography>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: '10px', width: '100%', backgroundColor: '#5e10b1' }}
              onClick={handleSavePortfolio}
            >
              Save Portfolio
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CreatePortfolio;
