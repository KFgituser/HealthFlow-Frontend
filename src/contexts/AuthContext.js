import  { createContext, useContext, useEffect, useState } from 'react';


//Session-Aware UI
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  const [currentUser, setCurrentUser, ] = useState(null);

    //Initialization
    useEffect(() => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedUser !== "undefined" && storedUser.trim().startsWith("{")) {
          const parsedUser = JSON.parse(storedUser);
          setCurrentUser(parsedUser);
          localStorage.setItem("user", JSON.stringify(parsedUser));
        } else {
          localStorage.removeItem("user");
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("⚠️ Failed to parse localStorage user:", err);
        localStorage.removeItem("user");
        setCurrentUser(null);
      }
    }, []);

    
    // Check session on mount
    useEffect(() => {
    console.log("🔍 AuthContext mounted");
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/session-check`,{
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
    }, [API_BASE]);

    const logout = async () => {
      try {
        await fetch(`${API_BASE}/api/users/logout`, {
          method: "POST",
          credentials: "include",
        });
        setCurrentUser(null);
        localStorage.removeItem("user");
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