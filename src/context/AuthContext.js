"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookies.get("access_token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false); // mark loading complete
  }, []);

  const login = (token) => {
    Cookies.set("access_token", token, {
      path: "/",
      sameSite: "Strict",
      secure: true,
    });
    setToken(token); // ✅ This ensures the context updates
  };
  

  const logout = () => {
    Cookies.remove("access_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
