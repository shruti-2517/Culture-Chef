import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {

    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    const data = await res.json()
    if (res.status == 200) {
      localStorage.setItem("token", data.accessToken)
      localStorage.setItem("username", data.username)
      navigate("/home");
    }
    else {
      setError(data.error)
    }
  };

  return (
    <div className="sign-up">
      <div className="div">
        <div className="text-wrapper-3">Welcome Back!</div>
        <div className="text-wrapper-4">Login</div>

        <form onSubmit={(e) => handleLogin(e)}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
