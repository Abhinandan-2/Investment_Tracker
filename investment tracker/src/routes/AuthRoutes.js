import React, { Component } from "react";
import { Route, Routes } from 'react-router-dom';
import Login from "../components/Auth/Login/Login";
import Signup from "../components/Auth/Signup/Signup";
import AccountRecovery from "../components/Auth/AccountRecovery/AccountRecovery";
import Home from '../components/Home/Home';
import Dashboard from '../components/WealthDashboard/Dashboard';
function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account-recovery" element={<AccountRecovery />} />
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes >
    )

}
export default AuthRoutes;