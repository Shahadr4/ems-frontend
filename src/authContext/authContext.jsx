// Example: src/authContext/authContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("https://vercel.com/shahadr4s-projects/ems-backend/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        } catch (err) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    verifyUser();
  }, []);

  const login = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);