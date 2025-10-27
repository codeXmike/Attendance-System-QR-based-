

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./login.css";
import { useSession } from "../context/SessionContext";


function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("")
    const { login } = useAuth();
    const { session } = useSession();
    const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    

    try {
      setLoading(true)
      const result = await login({ identifier, password});
      const role = result.role;
      console.log("Login result:", result);
      if (result.success) {
        if (session) {
          navigate("/attendance/scan");
          return;
        }else{
          if (role === "admin") navigate("/admin/dashboard");
          else if (role === "lecturer") navigate("/lecturer/dashboard");
          else navigate("/student/dashboard");
        }
        

      } else {
        setError(result.message);
      }
      setLoading(false)
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

    return (
        <div className="main">
            <div className="login-wrapper">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input   
                        type="email"
                        placeholder="Email/Matric No."
                        value={identifier}
                        onChange={e => setIdentifier(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="bottom-text" style={{ margin: '16px 0 4px' }}><a href="#">Forgot password?</a></p>
            </div>
        </div>
        </div>
        
    );
}

export default Login;
