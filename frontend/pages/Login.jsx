

import React, { useState } from "react";
import "./login.css";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement authentication logic here
        alert(`Email: ${email}\nPassword: ${password}`);
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
                <p className="bottom-text" style={{ margin: '16px 0 4px' }}><a href="#">Forgot password?</a></p>
            </div>
        </div>
        </div>
        
    );
}

export default Login;
