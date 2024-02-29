import React, { createContext, useState, useContext } from 'react';

const SavedPortfolioContext = createContext();

function SavedPortfolioProvider({ children }) {
    const [savedPortfolios, setSavedPortfolios] = useState([]);

    return (
        <SavedPortfolioContext.Provider value={{ savedPortfolios, setSavedPortfolios }}>
            {children}
        </SavedPortfolioContext.Provider>
    );
}

function useSavedPortfolio() {
    return useContext(SavedPortfolioContext);
}

export { SavedPortfolioProvider, useSavedPortfolio };
