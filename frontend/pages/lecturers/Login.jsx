

import React, { useState } from "react";
import "./login.css";


function LecturerLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement authentication logic here
        alert(`Email: ${email}\nPassword: ${password}`);
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Lecturer Login</h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input   
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                <p style={{ margin: '16px 0 4px' }}><a href="#">Forgot password?</a></p>
                <p style={{ margin: 0 }}>Don't have an account? <a href="#">Sign up</a></p>
            </div>
        </div>
    );
}

export default LecturerLogin;
