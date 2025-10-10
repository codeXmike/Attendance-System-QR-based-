// src/services/AdminService.js
import Admin from "../models/Admins.js";

export const createAdmin = async (data) => {
  return await Admin.create(data);
};

export const changePassword = async (id, password) => {
  if (!id || !password) throw new Error("Incomplete data");
  return await Admin.findByIdAndUpdate(id, { password }, { new: true });
};

export const getAllAdmins = async () => {
  return await Admin.find({});
};

export const getAdminById = async (id) => {
  return await Admin.findById(id);
};

export const getAdminByUsername = async (username) => {
  return await Admin.findOne({ username });
};

export const updateAdmin = async (id, data) => {
  return await Admin.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAdmin = async (id) => {
  return await Admin.findByIdAndDelete(id);
};

export const getAdminsByRole = async (role) => {
  return await Admin.find({ role });
};

export const getAdminsByFaculty = async (faculty_id) => {
  return await Admin.find({ faculty_id });
};

export const getAdminsByDepartment = async (department_id) => {
  return await Admin.find({ department_id });
};

export const getAdminsByClass = async (class_id) => {
  return await Admin.find({ class_id });
};

export const searchAdmins = async (query) => {
  return await Admin.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { username: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ],
  });
};
