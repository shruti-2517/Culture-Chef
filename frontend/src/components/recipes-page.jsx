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
        {Array.isArray(users) && users.map((user) => (
          <div
            key={user._id}
            className="user-card"
            onClick={() => navigate("/user-profile", { state: { user } })}
          >
            <img
              src={user.avatar || "/default-avatar.png"}
              alt={`${user.name}'s avatar`}
              className="user-avatar"
            />
            <h4>{user.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
