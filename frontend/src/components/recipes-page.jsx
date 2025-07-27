import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Recipes.css";

export const Recipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

const recipes = [
  { 
      id: 1, 
      title: "Spaghetti Bolognese", 
      desc: "Classic Italian pasta", 
      details: "A rich, meaty sauce served over spaghetti pasta. Perfect for dinner!",
      cuisine: "Italian",
      prepTime: 45,
    ingredients: [
      "400g spaghetti",
      "500g ground beef",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "400g canned tomatoes",
      "2 tbsp tomato paste",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook spaghetti according to package instructions.",
      "Brown the ground beef in a large pan.",
      "Add onion and garlic, cook until soft.",
      "Stir in tomatoes, tomato paste, and oregano.",
      "Simmer for 20 minutes, season to taste.",
      "Serve sauce over cooked spaghetti."
    ]
  },
  // ... other recipes with similar structure
];

  const closeModal = () => setSelectedRecipe(null);

  return (
    <div className="recipes-container">
      <h2>Discover Recipes</h2>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-icon">🍝</div>
            <h3>{recipe.title}</h3>
            <p>{recipe.desc}</p>
            <button 
              className="view-btn" 
              onClick={() => navigate(`/recipe/${recipe.id}`, { state: { recipe } })}
            >
              View Details
            </button>
          </div>
        ))}
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