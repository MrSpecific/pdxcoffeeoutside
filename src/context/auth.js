import { createContext, useContext, useState, useEffect } from 'react';
import { shopifyClient } from '@shopify/index';
import { customerRecoverMutation } from '@shopify/mutations';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerAccessToken, setCustomerAccessToken] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`/api/account/login`, {
        method: 'POST',
        headers: { email, password },
      });
      const { success } = await res.json();
      setIsLoggedIn(success);
      return { success };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/account/logout');
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const recover = async (email) => {
    try {
      const { data } = await shopifyClient.mutate({
        mutation: customerRecoverMutation,
        variables: {
          email,
        },
      });
      if (data) return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const renew = async () => {
    try {
      const res = await fetch('/api/account/renew');
      const { success } = await res.json();
      return { success };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  // check for stored access token and set login state
  useEffect(() => {
    (async function checkStoredToken() {
      const { success } = await renew();
      setIsLoggedIn(success);
    })();
  }, []);

  const value = {
    login,
    logout,
    recover,
    isLoggedIn,
    setIsLoggedIn,
    customerAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
