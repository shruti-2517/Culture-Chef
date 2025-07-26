const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipeModels");

router.get("/recipes/favourites", async (req, res) => {
  try {
    const favourites = await Recipe.find({ favourite: true });
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// done for testing
/* router.post("/recipes", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
*/
