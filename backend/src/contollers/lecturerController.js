import * as LecturerService from "../services/lecturerService.js";

// Create a new lecturer
export const createLecturer = async (req, res) => {
  try {
    const lecturer = await LecturerService.createLecturer(req.body);
    res.status(201).json({ success: true, data: lecturer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all lecturers
export const getAllLecturers = async (req, res) => {
  try {
    const lecturers = await LecturerService.getAllLecturers();
    res.status(200).json({ success: true, data: lecturers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single lecturer by ID
export const getLecturerById = async (req, res) => {
  try {
    const lecturer = await LecturerService.getLecturerById(req.params.id);
    if (!lecturer)
      return res.status(404).json({ success: false, message: "Lecturer not found" });

    res.status(200).json({ success: true, data: lecturer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update lecturer
export const updateLecturer = async (req, res) => {
  try {
    const lecturer = await LecturerService.updateLecturer(req.params.id, req.body);
    if (!lecturer)
      return res.status(404).json({ success: false, message: "Lecturer not found" });

    res.status(200).json({ success: true, data: lecturer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete lecturer
export const deleteLecturer = async (req, res) => {
  try {
    const lecturer = await LecturerService.deleteLecturer(req.params.id);
    if (!lecturer)
      return res.status(404).json({ success: false, message: "Lecturer not found" });

    res.status(200).json({ success: true, message: "Lecturer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get lecturers by department
export const getLecturersByDepartment = async (req, res) => {
  try {
    const lecturers = await LecturerService.getLecturersByDepartment(req.params.department_id);
    res.status(200).json({ success: true, data: lecturers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search lecturers
export const searchLecturers = async (req, res) => {
  try {
    const query = req.query.q || "";
    const lecturers = await LecturerService.searchLecturers(query);
    res.status(200).json({ success: true, data: lecturers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
