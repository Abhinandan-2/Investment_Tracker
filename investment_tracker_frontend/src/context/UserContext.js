import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  const setUser = (user) => {
    setUserData(user);
  };



  return (
    <UserContext.Provider value={{ userData, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

