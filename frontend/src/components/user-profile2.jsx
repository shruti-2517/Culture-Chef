import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";
import authFetch from "./authFetch";

import man1 from "../assets/man-1.png";
import man2 from "../assets/man-2.png";
import man3 from "../assets/man-3.png";
import women1 from "../assets/women-1.png";
import women2 from "../assets/women-2.png";
import women3 from "../assets/women-3.png";

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(women1);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const avatars = [man1, man2, man3, women1, women2, women3];

  const username = localStorage.getItem("username");

  const closeModal = () => setSelectedRecipe(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      const recipesRes = await authFetch(`/users/profile/${username}/recipes`, {
      });
      const recipesData = await recipesRes.json();
      setRecipes(recipesData.recipes || []);

      // Fetch user's bookmarks
      const bookmarksRes = await fetch(`/users/profile/${username}/recipesbookmarked`, {
      });
      const bookmarksData = await bookmarksRes.json();
      setBookmarkedRecipes(bookmarksData.bookmarks || []);

    }
    fetchData();
  }, []);

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="avatar-section">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <button
            className="change-avatar-btn"
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
          >
            Change Avatar
          </button>

          {showAvatarPicker && (
            <div className="avatar-picker">
              {avatars.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="avatar option"
                  className={`avatar-option ${avatar === img ? "selected" : ""}`}
                  onClick={() => {
                    setAvatar(img);
                    setShowAvatarPicker(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

      </div>
      <h2>{username}</h2>
      <div className="profile-tabs">
        <button
          className={activeTab === "recipes" ? "tab active" : "tab"}
          onClick={() => setActiveTab("recipes")}
        >
          My Recipes
        </button>
        <button
          className={activeTab === "bookmarks" ? "tab active" : "tab"}
          onClick={() => setActiveTab("bookmarks")}
        >
          Bookmarks
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "recipes" && (
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="recipe-card">
                <div className="recipe-icon">{recipe.icon || "🍳"}</div>
                <h3>{recipe.title}</h3>
                <p>{recipe.desc}</p>
                <button
                  className="view-btn"
                  onClick={() => navigate("/recipe-detail", { state: { recipe } })}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "bookmarks" && (
          <div className="recipes-grid">
            {bookmarkedRecipes.map((recipe) => (
              <div key={recipe._id} className="recipe-card">
                <div className="recipe-icon">{recipe.icon || "🍳"}</div>
                <h3>{recipe.title}</h3>
                <p>{recipe.desc}</p>
                <button
                  className="view-btn"
                  onClick={() => navigate("/recipe-detail", { state: { recipe } })}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRecipe.title}</h2>
            <p>{selectedRecipe.details}</p>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
