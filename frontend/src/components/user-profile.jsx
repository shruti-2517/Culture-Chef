import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";
import authFetch from "./authFetch";

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const navigate = useNavigate();

  const username = "ABC";

  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "foodie123",
    token: ""
  };

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
        <h2>{user.username}</h2>
      </div>

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
