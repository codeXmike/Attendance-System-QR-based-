// src/services/departmentFacultyService.js
import Faculty from "../models/Faculty.js";
import Department from "../models/Department.js";

/* =========================
   FACULTY SERVICES
========================= */
export const createFaculty = async (data) => {
  return await Faculty.create(data);
};

export const getAllFaculties = async () => {
  return await Faculty.find().sort({ created_at: -1 });
};

export const getFacultyById = async (id) => {
  return await Faculty.findById(id);
};

export const updateFaculty = async (id, data) => {
  return await Faculty.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFaculty = async (id) => {
  return await Faculty.findByIdAndDelete(id);
};

/* =========================
   DEPARTMENT SERVICES
========================= */
export const createDepartment = async (data) => {
  return await Department.create(data);
};

export const getAllDepartments = async () => {
  return await Department.find()
    .populate("faculty_id", "name logo")
    .sort({ created_at: -1 });
};

export const getDepartmentById = async (id) => {
  return await Department.findById(id).populate("faculty_id", "name logo");
};

export const updateDepartment = async (id, data) => {
  return await Department.findByIdAndUpdate(id, data, { new: true });
};

export const deleteDepartment = async (id) => {
  return await Department.findByIdAndDelete(id);
};
