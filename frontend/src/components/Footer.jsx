// components/Footer.jsx
import React from "react";
import "../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Culture Chef</h3>
          <p>Discover recipes from around the world</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/home">Home</a>
          <a href="/recipe-display">Recipes</a>
          <a href="/profile">Profile</a>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>contact@culturechef.com</p>
        </div>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} Culture Chef. All rights reserved.
      </div>
    </footer>
  );
};