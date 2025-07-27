import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "foodie123",
  };

  // Use the same recipes as in the Recipes component
  const recipes = [
    { 
      id: 1, 
      title: "Spaghetti Bolognese", 
      desc: "Classic Italian pasta", 
      details: "A rich, meaty sauce served over spaghetti pasta. Perfect for dinner!",
      cuisine: "Italian",
      prepTime: 45,
      icon: "🍝",
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
    // Add more recipes as needed
    {
      id: 2,
      title: "Chicken Curry",
      desc: "Spicy Indian favorite",
      details: "Aromatic chicken curry with rich spices",
      cuisine: "Indian",
      prepTime: 40,
      icon: "🍛"
    },
    {
      id: 3,
      title: "Caesar Salad",
      desc: "Classic American salad",
      details: "Crisp romaine with creamy dressing",
      cuisine: "American",
      prepTime: 15,
      icon: "🥗"
    }
  ];

  const bookmarkedRecipes = JSON.parse(localStorage.getItem("bookmarks")) || [
    { id: 7, title: "Greek Salad", desc: "Fresh Mediterranean salad", icon: "🥙" },
    { id: 8, title: "Mushroom Risotto", desc: "Creamy Italian rice dish", icon: "🍄" },
  ];

  const closeModal = () => setSelectedRecipe(null);

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
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-icon">{recipe.icon || "🍳"}</div>
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
        )}

        {activeTab === "bookmarks" && (
          <div className="recipes-grid">
            {bookmarkedRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-icon">{recipe.icon || "🍳"}</div>
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