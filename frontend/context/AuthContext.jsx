import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { meta } from "@eslint/js";

const AuthContext = createContext();

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser)
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("role");
    console.log(storedRole)
    return storedRole ? JSON.parse(storedRole) : null;
  });

  const [loading, setLoading] = useState(false);

  // Set token to axios headers if exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);


  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", credentials);
      console.log("The DATA", res.data)
      const { user, token, role } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("role", JSON.stringify(role));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      setRole(role);
      return { success: true, role };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };

    } finally {
      setLoading(false);
    }
  };



  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
