import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

// Creating a context for login state
const LoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); //2 disable ract login login = true

  // You would have a method to check if user is logged in
  // For example, checking a token in localStorage
  const checkLogin = () => {
    const access_token = Cookies.get('access_token');
    setIsLoggedIn(true); //2 disable ract login login = true
  };

  const value = {
    isLoggedIn,
    checkLogin,
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
