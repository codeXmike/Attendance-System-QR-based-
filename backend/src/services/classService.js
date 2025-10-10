// src/services/classService.js
import Class from "../models/Class.js";

/* =========================
   CLASS SERVICES
========================= */
export const createClass = async (data) => {
  return await Class.create(data);
};

export const getAllClasses = async () => {
  return await Class.find()
    .populate("department_id", "name code")
    .sort({ created_at: -1 });
};

export const getClassById = async (id) => {
  return await Class.findById(id).populate("department_id", "name code");
};

export const updateClass = async (id, data) => {
  return await Class.findByIdAndUpdate(id, data, { new: true });
};

export const deleteClass = async (id) => {
  return await Class.findByIdAndDelete(id);
};
