import React, { createContext, useContext, useEffect, useState } from 'react';


//Session-Aware UI
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
        setUser(data);
      } else {
        console.log("❌ Not logged in");
        setUser(null);
      }
    } catch (err) {
      console.error("⚠️ Session check failed:", err);
      setUser(null);
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
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};