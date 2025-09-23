import { loginAdmin, loginLecturer, loginStudent } from "../services/authServices.js";

// Login controller for all user types
export const login = async (req, res) => {
  const { userType } = req.body; // 'admin', 'lecturer', or 'student'
  try {
    let result;
    if (userType === "admin") {
      result = await loginAdmin(req.body);
    } else if (userType === "lecturer") {
      result = await loginLecturer(req.body);
    } else if (userType === "student") {
      result = await loginStudent(req.body);
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// Logout controller (stateless JWT, just a placeholder)
export const logout = async (req, res) => {
  // For JWT, logout is handled on the client by deleting the token
  res.json({ message: "Logged out successfully" });
};

// Refresh token controller (placeholder, implement if using refresh tokens)
export const refresh = async (req, res) => {
  // You would verify the refresh token and issue a new access token here
  res.status(501).json({ error: "Refresh token not implemented" });
};
