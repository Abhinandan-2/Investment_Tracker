import './App.css';
import { BrowserRouter as Router, Routes, Link, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import './components/StockMarketOverview/smo.css';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import PortfolioRoutes from './routes/PortfolioRoutes';


function App() {
  return (
    <div >
    <Router>
       
          <AuthRoutes />
          <DashboardRoutes />
          <PortfolioRoutes />
      </Router>
   
     
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
     
    </div>

  );
}

export default App;
