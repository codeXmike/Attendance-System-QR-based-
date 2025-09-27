import Courses from "../models/Courses";

export const createCourse = async (courseData) => {
  return await Courses.create(courseData);
};
export const getAllCourses = async () => {
  return await Courses.find({});
};
export const getCourseById = async (id) => {
  return await Courses.findById(id);
};
export const updateCourse = async (id, data) => {
  return await Courses.findByIdAndUpdate(id, data, { new: true });
};
export const deleteCourse = async (id) => {
  return await Courses.findByIdAndDelete(id);
};
export const getCoursesByDepartment = async (department_id) => {
  return await Courses.find({ department_id });
};
// services/courseService.js
import Courses from "../models/courseModel.js";

export const searchCourses = async (query) => {
  return await Courses.find({
    $or: [
      { code: { $regex: query, $options: "i" } },   
      { title: { $regex: query, $options: "i" } },  
      { department_id: { $regex: query, $options: "i" } }  
    ],
  });
};
