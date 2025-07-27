import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Users.css";

import man1 from "../assets/man-1.png";
import man2 from "../assets/man-2.png";
import women1 from "../assets/women-1.png";

export const Users = () => {
  const navigate = useNavigate();

  const users = [
    { id: 1, username: "john_doe", avatar: man1 },
    { id: 2, username: "mike_chef", avatar: man2 },
    { id: 3, username: "emily_foodie", avatar: women1 }
  ];

  return (
    <div className="users-container">
      <h2>Discover Users</h2>
      <div className="users-grid">
        {users.map((user) => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => navigate("/user-profile", { state: { user } })}
          >
            <img src={user.avatar} alt="User Avatar" className="user-avatar" />
            <h4>{user.username}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};