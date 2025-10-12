import Lecturer from "../models/Lecturer.js";
import Students from "../models/Students.js";
import Admins from "../models/Admins.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// import bcrypt from "bcrypt"; // enable when hashing

export const loginService = async (data) => {
  const { identifier, password } = data;
  if (!identifier || !password) throw new Error("Email or Matric No and password are required");

  let user = null;
  let role = "";

  // 1️⃣ Try admin
  user = await Admins.findOne({ $or: [{ email: identifier }, { username: identifier }] });
  if (user) role = "admin";

  // 2️⃣ Try lecturer
  if (!user) {
    user = await Lecturer.findOne({ email: identifier });
    if (user) role = "lecturer";
  }

  // 3️⃣ Try student
  if (!user) {
    user = await Students.findOne({ $or: [{ email: identifier }, { matric_no: identifier }] });
    if (user) role = "student";
  }

  // 4️⃣ Not found
  if (!user) throw new Error("User not found");

  // 5️⃣ Verify password
  // const isMatch = await bcrypt.compare(password, user.password);
  const isMatch = password === user.password; // simple version
  if (!isMatch) throw new Error("Invalid credentials");

  // 6️⃣ Create token payload
  const payload = { id: user._id, role };
  if (role === "admin") {
    payload.adminType = user.role;
    payload.faculty = user.faculty;
    payload.department = user.department;
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  // 7️⃣ Return safe user object
  const { password: _, ...safeUser } = user.toObject();
  return { token, user: safeUser, role };
};

export const loginAdmin = async (data) => {
    const { email, password } = data; // Require a username/email to identify the user

    // 1. Find the admin by a unique identifier (username or email)
    const admin = await Admins.findOne({
      $or: [{ email: email }, { username: email }]
    });
    if (!admin) throw new Error("Admin not found");

    // 2. Check Password
    // const isMatch = await bcrypt.compare(password, admin.password);
    const isMatch = password === admin.password? true:false; // For simplicity, replace with actual hash comparison

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
