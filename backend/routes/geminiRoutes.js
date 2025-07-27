const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateUser");

const {
  generateRecipeController
} = require("../controllers/geminiControllers");

router.post("/generate-recipe", authenticateToken, generateRecipeController);

module.exports = router;
