import React, { createContext, useContext, useState } from 'react';

// Creating a context for login state
const LoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // You would have a method to check if user is logged in
  // For example, checking a token in localStorage
  const checkLogin = () => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  };

  const value = {
    isLoggedIn,
    checkLogin,
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
