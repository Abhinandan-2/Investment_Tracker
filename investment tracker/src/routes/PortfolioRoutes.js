import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../components/portfolio/landingpage';
import CreatePortfolio from '../components/portfolio/createportfolio';
import SavedPortfolioPage from '../components/portfolio/savedportfolio';
import { SavedPortfolioProvider } from '../components/portfolio/SavedPortfolioProvider';

function PortfolioRoutes() {
    return (
        <SavedPortfolioProvider>
            <Routes>
             
                <Route path="dashboard/create-portfolio" element={<CreatePortfolio />} />
                <Route path="/dashboard/savedportfolio" element={<SavedPortfolioPage />} />
            </Routes>
        </SavedPortfolioProvider>
    );
}

export default PortfolioRoutes;
