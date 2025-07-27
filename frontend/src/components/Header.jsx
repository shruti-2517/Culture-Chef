import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/header.css";

export const Header = ({ showNav = true }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-content">
        {/* Logo & App Name */}
        <Link to="/home" className="logo-link">
          <img src={logo} alt="Culture Chef Logo" className="logo" />
          <span className="app-name">Culture Chef</span>
        </Link>
        
        {/* Navigation */}
        {showNav && (
          <nav className="main-nav">
            {user ? (
              <>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link register-link">Register</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};