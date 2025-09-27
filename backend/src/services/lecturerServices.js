import Lecturer from "../models/Lecturer";

export const createLecturer = async (lecturerData) => {
  return await Lecturer.create(lecturerData);
};
export const getAllLecturers = async () => {
  return await Lecturer.find({});
};
export const getLecturerById = async (id) => {
  return await Lecturer.findById(id);
};
export const updateLecturer = async (id, data) => {
  return await Lecturer.findByIdAndUpdate(id, data, { new: true });
};
export const deleteLecturer = async (id) => {
  return await Lecturer.findByIdAndDelete(id);
};
export const getLecturersByDepartment = async (department_id) => {
  return await Lecturer.find({ department_id });
};
export const searchLecturers = async (query) => {
  return await Lecturer.find({
    $or: [
      { name: { $regex: query, $options: "i" } },        
      { staff_no: { $regex: query, $options: "i" } },   
      { email: { $regex: query, $options: "i" } },       
      { phone: { $regex: query, $options: "i" } }        
    ],
  });
};