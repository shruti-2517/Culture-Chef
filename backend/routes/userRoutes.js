const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateUser");

const {
  getSelfProfileInfoController,
  profileVisibilityController,
  getPublicProfilesController,
  getBookmarkRecipesController,
  toggleBookmarksController,
  getRecipesController
} = require("../controllers/userControllers");

router.get("/users/selfprofile", authenticateToken, getSelfProfileInfoController);
router.patch("/users/profileVisibilty", authenticateToken, profileVisibilityController);
router.get("/users/publicProfiles", authenticateToken, getPublicProfilesController);
router.get("/users/profile/:username", getPublicProfilesController);
router.get("/users/profile/:username/recipesbookmarked", getBookmarkRecipesController);
router.get("/users/profile/:username/recipes", getRecipesController);
router.patch("/users/profile/recipes/togglebookmark", authenticateToken, toggleBookmarksController);

module.exports = router;