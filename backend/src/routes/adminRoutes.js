// src/routes/AdminRoutes.js
import express from "express";
import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAdminsByRole,
  getAdminsByFaculty,
  getAdminsByDepartment,
  getAdminsByClass,
  searchAdmins
} from "../contollers/adminsController.js";

const router = express.Router();

// CRUD
router.post("/", createAdmin);
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

// Filters
router.get("/role/:role", getAdminsByRole);
router.get("/faculty/:faculty_id", getAdminsByFaculty);
router.get("/department/:department_id", getAdminsByDepartment);
router.get("/class/:class_id", getAdminsByClass);

// Search
router.get("/search/query", searchAdmins);

export default router;
