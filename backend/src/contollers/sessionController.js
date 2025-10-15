// src/controllers/sessionController.js
import { createSession, endSession, getAllSessions } from "../services/sessionServices.js";
// Create new session
export const createSessions = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const session = await createSession(req.body);
    console.log("Created session:", session);
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const endSessions = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Ending session with ID:", id);
    console.log("Request body for ending session:", req.body);
    const result = await endSession(id, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all sessions
export const getAllSessionsf = async (req, res) => {
  try {
    const sessions = await getAllSessions();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get session by ID
export const getSessionById = async (req, res) => {
  try { 
    const session = await sessionService.getSessionById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update session
export const updateSession = async (req, res) => {
  try {
    const session = await sessionService.updateSession(req.params.id, req.body);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete session
export const deleteSession = async (req, res) => {
  try {
    const session = await sessionService.deleteSession(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json({ message: "Session deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get sessions by course
export const getSessionsByCourse = async (req, res) => {
  try {
    const sessions = await sessionService.getSessionsByCourse(req.params.course_id);
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get sessions by lecturer
export const getSessionsByLecturer = async (req, res) => {
  try {
    const sessions = await sessionService.getSessionsByLecturer(req.params.lecturer_id);
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get sessions by date range
export const getSessionsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const sessions = await sessionService.getSessionsByDateRange(startDate, endDate);
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get sessions by status
export const getSessionsByStatus = async (req, res) => {
  try {
    const sessions = await sessionService.getSessionsByStatus(req.params.status);
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search sessions
export const searchSessions = async (req, res) => {
  try {
    const sessions = await sessionService.searchSessions(req.query.q);
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get sessions by course + date range
export const getSessionsByCourseAndDateRange = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { startDate, endDate } = req.query;
    const sessions = await sessionService.getSessionsByCourseAndDateRange(
      course_id,
      startDate,
      endDate
    );
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
