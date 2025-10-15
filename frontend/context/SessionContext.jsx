// src/context/SessionContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";

const SessionContext = createContext();

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});
export function SessionProvider({ children }) {
  const [session, setSession] = useState([]);

  const createSession = async (data) => {
    const res = await api.post("/sessions", data);
    setSession(res.data);
    return res.data;
  };
  
  const endSession = async (sessionId, data) => {
  const res = await api.put(`/sessions/${sessionId}/end`, data);
  setSession(res.data);
  return res.data;
};


  const getSessions = async () => {
    const res = await api.get("/sessions");
    setSession(res.data);
  };

  return (
    <SessionContext.Provider value={{ session, createSession, endSession, getSessions }}>
      {children}
    </SessionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
