const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipeModels");
const authenticateToken = require("../middlewares/authenticateUser");

router.get("/recipes/favourites", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const favourites = await Recipe.find({ favourite: true, userId });
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
