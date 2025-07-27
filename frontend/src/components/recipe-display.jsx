import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/recipe-display.css";

export const RecipeDisplay = () => {
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
        <h1>{recipe.name}</h1>
        <div className="recipe-icon">{recipe.icon || "🍳"}</div>
      </div>

      <div className="recipe-meta">
        <span className="cuisine">{recipe.cuisine}</span>
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
        <p>{recipe.culturalBackground}</p>
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