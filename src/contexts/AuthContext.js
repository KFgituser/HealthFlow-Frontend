import React, { createContext, useContext, useEffect, useState } from 'react';


//Session-Aware UI
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser, ] = useState(null);

    //Initialization
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    }, []);

    
    // Check session on mount
    useEffect(() => {
    console.log("🔍 AuthContext mounted");
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/session-check", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log("✅ Logged in as:", data);
          setCurrentUser(data);
           localStorage.setItem("user", JSON.stringify(data));
        } else {
          console.log("❌ Not logged in");
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("⚠️ Session check failed:", err);
        setCurrentUser(null);
       
      }
    };

    checkSession();
  }, []);

    const logout = async () => {
      try {
        await fetch("http://localhost:8080/api/users/logout", {
          method: "POST",
          credentials: "include",
        });
        setCurrentUser(null);
      } catch (err) {
        console.error("Logout failed", err);
      }
    };

    return (
      <AuthContext.Provider value={{currentUser, setCurrentUser,logout}}>
        {children}
      </AuthContext.Provider>
    );
  };