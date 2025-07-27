// recipe-detail.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/recipe-detail.css";

export const RecipeDetail = ({ recipe }) => {
  const navigate = useNavigate();

  if (!recipe) {
    return (
      <div className="recipe-detail-container">
        <p>Recipe not found</p>
        <Link to="/home" className="back-btn">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail-container">
      <h1>{recipe.title}</h1>
      <div className="recipe-icon">{recipe.icon || "🍳"}</div>
      
      <div className="recipe-meta">
        <span className="cuisine">{recipe.cuisine || "International"}</span>
        <span className="prep-time">Prep Time: {recipe.prepTime || "30"} mins</span>
      </div>

=

      <div className="recipe-section">
        <h2>Description</h2>
        <p>{recipe.details || recipe.desc || "No description available."}</p>
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

      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>
    </div>
  );
};