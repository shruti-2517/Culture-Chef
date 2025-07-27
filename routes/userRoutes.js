const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateUser");

const {
  getSelfProfileInfoController,
  profileVisibilityController,
  getPublicProfilesController,
  getBookmarkRecipesController,
  addBookmarksController,
  deleteBookmarksController,
  getRecipesController
} = require("../controllers/userControllers");

router.get("/users/selfprofile", authenticateToken, getSelfProfileInfoController);
router.patch("/users/profileVisibilty", authenticateToken, profileVisibilityController);
router.get("/users/publicProfiles", authenticateToken, getPublicProfilesController);
router.get("/users/profile/:username", getPublicProfilesController);
router.get("/users/profile/:username/recipesbookmarked", getBookmarkRecipesController);
router.get("/users/profile/:username/recipes", getRecipesController);
router.patch("/users/profile/recipes/addbookmark", authenticateToken, addBookmarksController);
router.delete("/users/profile/recipes/deletebookmark", authenticateToken, deleteBookmarksController);

module.exports = router;