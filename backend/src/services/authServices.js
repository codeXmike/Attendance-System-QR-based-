import Lecturer from "../models/Lecturer";
import Students from "../models/Students";
import Admins from "../models/Admins";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (data) => {
    const { username, password } = data; // Require a username/email to identify the user

    // 1. Find the admin by a unique identifier (username or email)
    const admin = await Admins.findOne({
      $or: [{ email: username }, { username: username }]
    });
    if (!admin) throw new Error("Admin not found");

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // 3. Generate JWT Token. Include the specific admin role in the payload.
    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin", // Top-level role stays "admin"
        adminType: admin.role, // Specific sub-role: 'super', 'faculty', 'department'
        // Optional: Include faculty/department for easier access control in endpoints
        faculty: admin.faculty,
        department: admin.department
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4. Return token and admin info (you may want to omit the password from the response)
    const { password: _, ...adminWithoutPassword } = admin.toObject(); // Exclude password
    return { token, admin: adminWithoutPassword, role: "admin" };
}
export const loginLecturer = async (data) => {
    const { email, password } = data;
    const lecturer = await Lecturer.findOne({ email });
    if (!lecturer) throw new Error("Lecturer not found");
    const isMatch = await bcrypt.compare(password, lecturer.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: lecturer._id, role: "lecturer" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    // Create a new object without the password field
    const { password: _, ...lecturerWithoutPassword } = lecturer.toObject();
    
    return { token, lecturer: lecturerWithoutPassword, role: "lecturer" };
}

export const loginStudent = async (data) => {
    const { matric_no, password } = data;
    const student = await Students.findOne({ matric_no });
    if (!student) throw new Error("Student not found");
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1h" });
     const { password: _, ...studdentWithoutPassword } = student.toObject();
    return { token, student, studdentWithoutPassword: "student" };
}
