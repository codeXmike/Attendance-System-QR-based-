// src/context/SessionContext.js
import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const SessionContext = createContext();

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});
export function SessionProvider({ children }) {
  // Load session from localStorage if available
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("activeSession")) || null
  );
  const [sessions, setSessions] = useState([]);
  
  const createSession = async (data) => {
    const res = await api.post("/sessions", data);
    setSession(res.data);
    localStorage.setItem("activeSession", JSON.stringify(res.data)); // persist it
    return res.data;
  };
  
  const scanStudent = (payload) => {
    const res = api.post("/attendance/scan", {payload, sessionId: session._id});
    return res;
  }
  const endSession = async (sessionId, data) => {
    const res = await api.put(`/sessions/${sessionId}/end`, data);
    setSession(null);
    localStorage.removeItem("activeSession"); // clear it
    return res.data;
  };

  // Memoized fetch for sessions
  const getSessions = useCallback(async () => {
    try {
      const res = await api.get("/sessions");
      const sessionsData = res.data.map((session) => ({
        id: session._id.$oid,
        sessionName: session.session_name,
        sessionType: session.session_type,
        status: session.status,
        location: session.metadata?.location || "Unknown Location",
        audience: session.metadata?.audience || "All",
        notes: session.metadata?.notes || "",
        startedAt: session.started_at?.$date,
        endedAt: session.ended_at?.$date,
        records: session.records || [],
        createdBy: session.created_by?.$oid,
      }));
      setSessions(sessionsData);
      return sessionsData;
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return [];
    }
  }, []);

  const getSessionById = async (sessionId) => {
    try {
      const res = await api.get(`/sessions/${sessionId}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching session:", error);
      return null;
    }
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        sessions,
        createSession,
        scanStudent,
        endSession,
        getSessions,
        getSessionById,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
