import React, { Component } from "react";
import { Route, Routes } from 'react-router-dom';
import ESG from "../components/ESG/ESG";
import RenderStock from "../components/StockMarketOverview/RenderStock";
import StockTradingApp from "../components/Investment/StockTradingApp";

import UserProfile from "../components/EditProfile/UserProfile";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory"
import LandingPage from "../components/portfolio/landingpage";
import Login from "../components/Auth/Login/Login";

import BalanceAddPage from '../components/AddAmount/BalanceAddPage';

function DashboardRoutes() {
    return (
        <Routes>
            <Route path="dashboard/esg" element={<ESG />} />
            <Route path="dashboard/stockoverview" element={<RenderStock/>}/>
            <Route path="dashboard/invest" element={<StockTradingApp />} />
            <Route path="dashboard/portfolio" element={<LandingPage/>}/>
            <Route path="dashboard/profile" element={<UserProfile/>}/>
            <Route path="dashboard/transaction-history" element={<TransactionHistory/>}/>
            <Route path="dashboard/add-amount" element={<BalanceAddPage />}/>
            <Route path="dashboard/logout" element={<Login/>}/>
         
        </Routes >
    )

}
export default DashboardRoutes;