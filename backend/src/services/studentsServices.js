import Students from "../models/Students.js";

export const createStudent = async(data) => {
    return await Students.create(data);
};

export const getAllStudents = async() => {
    return await Students.find({});
};
export const getStudentById = async(id) => {
    return await Students.findById(id);
};
export const getStudentByMatricNo = async(matric_no) => {
    return await Students.findOne({ matric_no });
};
export const updateStudent = async(id, data) => {
    return await Students.findByIdAndUpdate(id, data, { new: true });
};
export const deleteStudent = async(id) => {
    return await Students.findByIdAndDelete(id);
};
export const getStudentsByDepartment = async(department_id) => {
    return await Students.find({ department_id });
};
export const getStudentsByStatus = async(status) => {
    return await Students.find({ status });
};
export const searchStudents = async (query) => {
  return await Students.find({
    $or: [
      { name: { $regex: query, $options: "i" } },        
      { matric_no: { $regex: query, $options: "i" } },   
      { email: { $regex: query, $options: "i" } },       
      { phone: { $regex: query, $options: "i" } }        
    ],
  });
};