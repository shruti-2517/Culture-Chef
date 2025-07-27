import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/recipe-display.css";
import authFetch from "./authFetch";

export const RecipeDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  const handleBookmark = async () => {
    const response = await fetch("/users/profile/recipes/togglebookmark", {
      method: "PATCH",
      body: JSON.stringify({ recipeId: recipe._id || recipe.id }),
    });

    const data = await response.json();

    if (!response.ok) {
      
    }

    setIsBookmarked(data.bookmarked);
  };


  const handleRegenerate = () => {
    // In a real app, this would call your AI generation API
    alert("Regenerating recipe with similar parameters...");
    // For now, just refresh the page with the same recipe
    navigate("/recipe-display", { state: { recipe } });
  };

  const handleClose = () => {
    navigate("/home");
  };

  return (
    <div className="recipe-display-container">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-icon">{recipe.icon || "🍳"}</div>
      </div>

      <div className="recipe-meta">
        <span className="cuisine">{recipe.culture}</span>
        <span className="prep-time">Prep Time: {recipe.prepTime} mins</span>
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h2>Cultural Background</h2>
        <p>{recipe.description}</p>
      </div>

      <div className="recipe-section">
        <h2>Preparation Instructions</h2>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="action-buttons">
        <button onClick={handleClose} className="action-btn close-btn">
          Close
        </button>
        <button onClick={handleRegenerate} className="action-btn regenerate-btn">
          Regenerate
        </button>
        <button onClick={handleBookmark} className="action-btn bookmark-btn">
          Bookmark
        </button>
      </div>
    </div>
  );
};