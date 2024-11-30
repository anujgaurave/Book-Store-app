/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

import * as jwt_decode from "jwt-decode";

export const AuthContext = createContext();


export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");

  const [autoUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : undefined
  );

 
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        if (decodedToken && !isTokenExpired(decodedToken)) {
          setAuthUser(decodedToken); 
        } else {
          handleInvalidToken(); 
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        handleInvalidToken(); 
      }
    }
  }, []); 

 
  const isTokenExpired = (decodedToken) => {
    const currentTime = Date.now() / 1000; 
    return decodedToken.exp < currentTime; 
  };

  
  const handleInvalidToken = () => {
    localStorage.removeItem("token"); 
    setAuthUser(undefined); 
  };

  return (
    <AuthContext.Provider value={[autoUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
