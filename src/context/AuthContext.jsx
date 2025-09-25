import React, { createContext, useState, useContext } from 'react';

// Create a Context object
const AuthContext = createContext(null);

// Create a custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component that will wrap our application
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // In a real app, this would be an API call
    setIsLoggedIn(true);
  };

  const logout = () => {
    // In a real app, this would also clear tokens etc.
    setIsLoggedIn(false);
  };

  const value = { isLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};