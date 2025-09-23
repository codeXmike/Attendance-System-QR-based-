import * as studentServices from "../services/studentsServices.js";
import Student from "../models/Students.js";

export const createStudent = async (req, res) => {
  try {
    // 1. Input validation
    const requiredFields = ['matric_no', 'name', 'email', 'department_id'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // 3. Generate matric_hash (if not provided)
    if (!req.body.matric_hash) {
      const crypto = await import('crypto');
      req.body.matric_hash = crypto
        .createHash('sha256')
        .update(req.body.matric_no)
        .digest('hex');
    }
    const existingStudent = await Student.findOne({ 
      $or: [
        { matric_no: req.body.matric_no },
        { matric_hash: req.body.matric_hash }
      ] 
    });
    
    if (existingStudent) {
      return res.status(409).json({ error: 'Student with this matric number already exists' });
    }

    // 5. Set timestamps
    req.body.created_at = new Date();
    req.body.updated_at = new Date();

    // 6. Call service
    const student = await studentServices.createStudent(req.body);
    
    res.status(201).json(student);
  } catch (error) {
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Duplicate entry - student already exists' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

export const getAllStudents = async (req, res)=>{
    try {
        const students = studentServices.getAllStudents()
        res.status(200).json(students )
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const getStudentById = async (req, res) => {
    try {
        const student = studentServices.getStudentById()
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json(error.message)
    }
}