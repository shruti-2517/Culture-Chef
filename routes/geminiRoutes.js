const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateUser");

const {
  generateRecipeController
} = require("../controllers/geminiControllers");

router.get("/generate-recipe", authenticateToken, generateRecipeController);

module.exports = router;
