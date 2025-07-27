import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSignUp(e) {

    e.preventDefault();

    if (!email || !username || !password) {
      setError("Please fill all the fields");
      return;
    }

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      })
    })
    const data = await res.json()
    if (res.status == 200) {
      localStorage.setItem("token", data.accessToken)
      navigate("/home")
    }
    else {
      setError(data.error)
    }
  };

  return (
    <div className="sign-up">
      <div className="div">
        <div className="text-wrapper-3">Welcome to Culture Chef</div>
        <div className="text-wrapper-4">Sign Up</div>

        <form onSubmit={(e) => handleSignUp(e)}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          {error && <p className="error">{error}</p>}

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
