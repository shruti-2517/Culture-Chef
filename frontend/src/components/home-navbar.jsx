import React from "react";
import { Link } from "react-router-dom";
import "../styles/homenavbar.css";

export const HomeNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Culture Chef</div>
      <div className="nav-links">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};
