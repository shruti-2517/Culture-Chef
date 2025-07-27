// recipe-detail.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/recipe-detail.css";
import authFetch from "./authFetch";

export const RecipeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { recipe } = location.state || {
    recipe: {
      name: "Sample Recipe",
      cuisine: "Italian",
      prepTime: 30,
      ingredients: ["Pasta", "Tomato Sauce"],
      culturalBackground: "Sample cultural background",
      instructions: ["Step 1", "Step 2"]
    }
  };

  const handleBookmark = () => {
    // Get existing bookmarks or initialize empty array
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    // Check if recipe is already bookmarked
    if (!bookmarks.some(b => b.id === recipe.id)) {
      // Add to bookmarks
      localStorage.setItem(
        "bookmarks",
        JSON.stringify([...bookmarks, { ...recipe, id: Date.now() }])
      );
      alert("Recipe bookmarked!");
    } else {
      alert("Recipe already bookmarked");
    }
  };

  return (
    <div className="recipe-detail-container">
      <h1>{recipe.title}</h1>
      <div className="recipe-icon">{recipe.icon || "🍳"}</div>

      <div className="recipe-meta">
        <span className="cuisine">{recipe.culture || "International"}</span>
        <span className="prep-time">Prep Time: {recipe.prepTime || "30"} mins</span>
      </div>


      <div className="recipe-section">
        <h2>Description</h2>
        <p>{recipe.description || "No description available."}</p>
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          )) || <li>No ingredients listed</li>}
        </ul>
      </div>

      <div className="recipe-section">
        <h2>Preparation Instructions</h2>
        <ol>
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          )) || <li>No instructions available</li>}
        </ol>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate(-1)} className="back-btn">
          Back
        </button>
        <button onClick={handleBookmark} className="action-btn bookmark-btn">
          Bookmark
        </button>
      </div>


    </div>
  );
};