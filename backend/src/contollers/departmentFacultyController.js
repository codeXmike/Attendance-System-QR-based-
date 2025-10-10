// src/controllers/departmentFacultyController.js
import {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../services/departmentFacultyService.js";

/* =========================
   FACULTY CONTROLLERS
========================= */
export const createFacultyController = async (req, res) => {
  try {
    const faculty = await createFaculty(req.body);
    res.status(201).json(faculty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllFacultiesController = async (req, res) => {
  try {
    const faculties = await getAllFaculties();
    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFacultyByIdController = async (req, res) => {
  try {
    const faculty = await getFacultyById(req.params.id);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFacultyController = async (req, res) => {
  try {
    const faculty = await updateFaculty(req.params.id, req.body);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.status(200).json(faculty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFacultyController = async (req, res) => {
  try {
    const faculty = await deleteFaculty(req.params.id);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DEPARTMENT CONTROLLERS
========================= */
export const createDepartmentController = async (req, res) => {
  try {
    const department = await createDepartment(req.body);
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllDepartmentsController = async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDepartmentByIdController = async (req, res) => {
  try {
    const department = await getDepartmentById(req.params.id);
    if (!department) return res.status(404).json({ error: "Department not found" });
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDepartmentController = async (req, res) => {
  try {
    const department = await updateDepartment(req.params.id, req.body);
    if (!department) return res.status(404).json({ error: "Department not found" });
    res.status(200).json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDepartmentController = async (req, res) => {
  try {
    const department = await deleteDepartment(req.params.id);
    if (!department) return res.status(404).json({ error: "Department not found" });
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
