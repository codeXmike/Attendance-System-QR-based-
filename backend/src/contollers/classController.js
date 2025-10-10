// src/controllers/classController.js
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../services/classService.js";

/* =========================
   CLASS CONTROLLERS
========================= */
export const createClassController = async (req, res) => {
  try {
    const classData = await createClass(req.body);
    res.status(201).json(classData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllClassesController = async (req, res) => {
  try {
    const classes = await getAllClasses();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getClassByIdController = async (req, res) => {
  try {
    const classData = await getClassById(req.params.id);
    if (!classData) return res.status(404).json({ error: "Class not found" });
    res.status(200).json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateClassController = async (req, res) => {
  try {
    const classData = await updateClass(req.params.id, req.body);
    if (!classData) return res.status(404).json({ error: "Class not found" });
    res.status(200).json(classData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteClassController = async (req, res) => {
  try {
    const classData = await deleteClass(req.params.id);
    if (!classData) return res.status(404).json({ error: "Class not found" });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
