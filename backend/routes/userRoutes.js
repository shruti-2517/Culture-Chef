const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateUser");

const {
  getSelfProfileInfoController,
  profileVisibilityController,
  getAllProfilesController,
  getBookmarkRecipesController,
  toggleBookmarksController,
  getRecipesController,
  isRecipeBookmarkedController
} = require("../controllers/userControllers");

router.get("/users/selfprofile", authenticateToken, getSelfProfileInfoController);
router.patch("/users/profileVisibilty", authenticateToken, profileVisibilityController);
router.get("/users/allProfiles", authenticateToken, getAllProfilesController);
// router.get("/users/profile/:username", getPublicProfilesController);
router.get("/users/profile/:username/recipesbookmarked", getBookmarkRecipesController);
router.get("/users/profile/:username/recipes", getRecipesController);
router.patch("/users/profile/recipes/togglebookmark", authenticateToken, toggleBookmarksController);
router.patch("/users/profile/recipes/:recipeId/isbookmarked", authenticateToken, isRecipeBookmarkedController);

module.exports = router;