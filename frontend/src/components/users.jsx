import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Users.css";

import man1 from "../assets/man-1.png";
import man2 from "../assets/man-2.png";
import woman1 from "../assets/women-1.png";

export const Users = () => {
  const navigate = useNavigate();

  const users = [
    { 
      id: 1, 
      username: "john_doe", 
      avatar: man1,
      bio: "Food enthusiast and home cook. Love sharing recipes!",
      followers: 1243,
      following: 56,
      recipes: 28
    },
    { 
      id: 2, 
      username: "mike_chef", 
      avatar: man2,
      bio: "Professional chef with 10 years of experience. Specializing in Italian cuisine.",
      followers: 8921,
      following: 112,
      recipes: 143
    },
    { 
      id: 3, 
      username: "emily_foodie", 
      avatar: woman1,
      bio: "Food blogger and photographer. Always looking for new flavors!",
      followers: 5678,
      following: 234,
      recipes: 87
    }
  ];

  return (
    <div className="users-container">
      <h2>Discover Users</h2>
      <div className="users-grid">
        {users.map((user) => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => navigate(`/user/${user.id}`, { state: { user } })}
          >
            <img src={user.avatar} alt="User Avatar" className="user-avatar" />
            <h4>{user.username}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};