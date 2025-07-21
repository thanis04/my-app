import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAuthData } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login/", { email, password });
      saveAuthData(res.data.token, res.data.role);

      if (res.data.role === "super_admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Forgot password?{" "}
          <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/password-recovery")}>
            Recover
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
