import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './landingpage';
import { SavedPortfolioProvider } from './SavedPortfolioProvider';


import CreateSmallcase from './createportfolio';
import SavedPortfolioPage from './savedportfolio';
import { Navbar,Nav } from 'react-bootstrap';
import {NavLink} from "react-router-dom";

function Portfolio() {
    return (
        <>

        <SavedPortfolioProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="/portfolio-overview" element={<PortfolioOverview />} /> */}
                <Route path="/create-smallcase" element={<CreateSmallcase />} />
                <Route path="/savedportfolio" element={<SavedPortfolioPage />} />
            </Routes>
        </SavedPortfolioProvider>
        </>
    );
}

export default Portfolio;
