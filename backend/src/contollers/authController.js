import { loginAdmin, loginLecturer, loginStudent } from "../services/authServices.js";


import { loginService } from "../services/authServices.js";

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.json(result);
  } catch (err) {
    console.error("Login error:", err.message);
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
