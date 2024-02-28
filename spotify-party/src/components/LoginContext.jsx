import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

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
    const access_token = Cookies.get('access_token');
    setIsLoggedIn(access_token);
  };

  const value = {
    isLoggedIn,
    checkLogin,
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
