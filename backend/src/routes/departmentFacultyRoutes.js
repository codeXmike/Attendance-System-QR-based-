// src/routes/departmentFacultyRoutes.js
import express from "express";
import {
  createFacultyController,
  getAllFacultiesController,
  getFacultyByIdController,
  updateFacultyController,
  deleteFacultyController,
  createDepartmentController,
  getAllDepartmentsController,
  getDepartmentByIdController,
  updateDepartmentController,
  deleteDepartmentController,
} from "../contollers/departmentFacultyController.js";

const router = express.Router();

/* =========================
   FACULTY ROUTES
========================= */
router.post("/faculties", createFacultyController);
router.get("/faculties", getAllFacultiesController);
router.get("/faculties/:id", getFacultyByIdController);
router.put("/faculties/:id", updateFacultyController);
router.delete("/faculties/:id", deleteFacultyController);

/* =========================
   DEPARTMENT ROUTES
========================= */
router.post("/departments", createDepartmentController);
router.get("/departments", getAllDepartmentsController);
router.get("/departments/:id", getDepartmentByIdController);
router.put("/departments/:id", updateDepartmentController);
router.delete("/departments/:id", deleteDepartmentController);

export default router;
