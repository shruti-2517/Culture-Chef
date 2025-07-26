const express = require("express");
const router = express.Router();
const {
  generateRecipeController
} = require("../controllers/geminiControllers");

router.get("/generate-recipe", generateRecipeController);

module.exports = router;
