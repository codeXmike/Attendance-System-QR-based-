// src/controllers/AdminController.js
import * as AdminService from "../services/adminService.js";

export const createAdmin = async (req, res) => {
  try {
    const admin = await AdminService.createAdmin(req.body);
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminService.getAllAdmins();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await AdminService.getAdminById(req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const admin = await AdminService.updateAdmin(req.params.id, req.body);
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await AdminService.deleteAdmin(req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.status(200).json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdminsByRole = async (req, res) => {
  try {
    const admins = await AdminService.getAdminsByRole(req.params.role);
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdminsByFaculty = async (req, res) => {
  try {
    const admins = await AdminService.getAdminsByFaculty(req.params.faculty_id);
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdminsByDepartment = async (req, res) => {
  try {
    const admins = await AdminService.getAdminsByDepartment(req.params.department_id);
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdminsByClass = async (req, res) => {
  try {
    const admins = await AdminService.getAdminsByClass(req.params.class_id);
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchAdmins = async (req, res) => {
  try {
    const { q } = req.query;
    const admins = await AdminService.searchAdmins(q);
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
