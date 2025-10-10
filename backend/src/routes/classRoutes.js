// src/routes/classRoutes.js
import express from "express";
import {
  createClassController,
  getAllClassesController,
  getClassByIdController,
  updateClassController,
  deleteClassController,
} from "../contollers/classController.js";

const router = express.Router();

/* =========================
   CLASS ROUTES
========================= */
router.post("/", createClassController);
router.get("/", getAllClassesController);
router.get("/:id", getClassByIdController);
router.put("/:id", updateClassController);
router.delete("/:id", deleteClassController);

export default router;
