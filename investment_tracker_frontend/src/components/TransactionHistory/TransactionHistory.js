import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar,Nav } from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  styled,
} from '@mui/material';
import transaction_api from '../../APIs/Transaction-api';
import { useUser } from '../../context/UserContext';
import axiosInstance from '../../axiosInstance';
import NavBar from '../NavBar/NavBar';

const TransactionTableContainer = styled(TableContainer)({
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  width: '90%',
});

const StyledTableCell = styled(TableCell)({
  fontSize: '1rem',
  whiteSpace: 'nowrap',
  textAlign: 'left',
});

const StyledTableHeadCell = styled(StyledTableCell)({
  fontWeight: 'bold',
});

const TransactionHistory = () => {
  const {userData} =useUser();
  const userId = userData.id;
  const [userTransactions, setUserTransactions] = useState([]);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortField, setSortField] = useState('time');
  const [filterStatus, setFilterStatus] = useState('all');


  useEffect(()=>{

    const fetchTransactionHistory = async() =>{
      await axiosInstance.get(transaction_api)
      .then(response => {
        const transactionHistory = response.data;
      for(let i=0;i<transactionHistory.length;i++){
        if(transactionHistory[i].user_id==userId){
          setUserTransactions((prevTransaction) => [...prevTransaction,transactionHistory[i]]);
        }
      }
      for(let i=0; i<userTransactions.length;i++){
        console.log(userTransactions[i]);
      }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
    }
    fetchTransactionHistory();
  },[]);
 

  // Helper function to filter transactions based on status
  const filterTransactions = (transactions, status) => {
    if (status === 'all') {
      return transactions;
    }
    return transactions.filter(transaction => transaction.status === status);
  };

  // Helper function to sort transactions based on the selected field
  const sortTransactions = (transactions, field) => {
    return transactions.slice().sort((a, b) => {
      if (field === 'time') {
        return new Date(a[field]) - new Date(b[field]);
      }
      return a[field] - b[field];
    });
  };

  const filteredTransactions = filterTransactions(userTransactions, filterStatus);
  const sortedTransactions = sortTransactions(filteredTransactions, sortField);

  return (
        <>



<NavBar heding = "Transaction"/>
  
    <TransactionTableContainer component={Paper}>
      <Typography variant="h5" align="center" gutterBottom style={{backgroundColor:'#5a287d' , color:'white' ,padding :'10px 10px 10px 10px', marginBottom:'20px'}}> 
        Transaction History
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button onClick={(event) => setSortAnchorEl(event.currentTarget)} variant="outlined">
          Sort By: {sortField.replace('_', ' ').toUpperCase()}
        </Button>
        <Button onClick={(event) => setFilterAnchorEl(event.currentTarget)} variant="outlined">
          Filter: {filterStatus.toUpperCase()}
        </Button>
      </div>
      <Popover
        open={Boolean(sortAnchorEl)}
        anchorEl={sortAnchorEl}
        onClose={() => setSortAnchorEl(null)}
      >
        <List>
          <ListItem button onClick={() => { setSortField('amount'); setSortAnchorEl(null); }}>
            <ListItemText primary="Amount" />
          </ListItem>
          <ListItem button onClick={() => { setSortField('time'); setSortAnchorEl(null); }}>
            <ListItemText primary="Time" />
          </ListItem>
        </List>
      </Popover>
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
      >
        <List>
          <ListItem button onClick={() => { setFilterStatus('all'); setFilterAnchorEl(null); }}>
            <ListItemText primary="All" />
          </ListItem>
          <ListItem button onClick={() => { setFilterStatus('success'); setFilterAnchorEl(null); }}>
            <ListItemText primary="Success" />
          </ListItem>
          <ListItem button onClick={() => { setFilterStatus('failed'); setFilterAnchorEl(null); }}>
            <ListItemText primary="Failed" />
          </ListItem>
        </List>
      </Popover>
      <Table >
        <TableHead>
          <TableRow>
            <StyledTableHeadCell>Transaction ID</StyledTableHeadCell>
            <StyledTableHeadCell>Amount</StyledTableHeadCell>
            <StyledTableHeadCell>Status</StyledTableHeadCell>
            <StyledTableHeadCell>Time</StyledTableHeadCell>
            <StyledTableHeadCell>Stock Name</StyledTableHeadCell>
            <StyledTableHeadCell>Quantity</StyledTableHeadCell>
            <StyledTableHeadCell>Type</StyledTableHeadCell>
            <StyledTableHeadCell>Balance</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTransactions.map((transaction) => (
            <TableRow key={transaction.transaction_id}>
              <StyledTableCell>{transaction.id}</StyledTableCell>
              <StyledTableCell>${transaction.amount.toFixed(2)}</StyledTableCell>
              <StyledTableCell style={{ color: transaction.status === 'success' ? 'green' : 'red' }}>
                {transaction.status}
              </StyledTableCell>
              <StyledTableCell>{transaction.transactionDate}</StyledTableCell>
              <StyledTableCell>{transaction.stockSymbol}</StyledTableCell>
              <StyledTableCell>{transaction.quantity}</StyledTableCell>
              {/* <StyledTableCell style={{ color: transaction.type === 'Buy' ? 'green' : 'red' }}>{transaction.type}</StyledTableCell> */}
              <StyledTableCell >{transaction.type}</StyledTableCell>
              {/* <StyledTableCell>{transaction.closingBalance.toFixed(2)}</StyledTableCell> */}
              <StyledTableCell>{transaction.closingBalance !== null ? `$${transaction.closingBalance.toFixed(2)}` : 'N/A'}</StyledTableCell>

            </TableRow>
          ))}
        </TableBody>

        
      </Table>
    </TransactionTableContainer>
    </>
  );
};

export default TransactionHistory;
