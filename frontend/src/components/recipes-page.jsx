import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Recipes.css";
import authFetch from "./authFetch";

import man1 from "../assets/man-1.png";
import man2 from "../assets/man-2.png";
import man3 from "../assets/man-3.png";
import women1 from "../assets/women-1.png";
import women2 from "../assets/women-2.png";
import women3 from "../assets/women-3.png";

export const Recipes = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Array of fallback avatars
  const avatars = [man1, man2, man3, women1, women2, women3];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await authFetch("/users/allProfiles");
        const data = await res.json();
        setUsers(data.users || []); 
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="recipes-container">
      <h2>Discover Users</h2>
      <div className="users-grid">
        {Array.isArray(users) && users.map((user) => {
          const avatar = user.avatar || avatars[Math.floor(Math.random() * avatars.length)];
          return (
            <div
              key={user._id}
              className="user-card"
              onClick={() => navigate("/user-profile", { state: { user } })}
            >
              <img
                src={avatar}
                alt={`${user.name}'s avatar`}
                className="user-avatar"
              />
              <h4>{user.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
