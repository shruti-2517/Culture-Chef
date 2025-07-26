const express = require("express");
const router = express.Router();

const {
  getProfileInfoController,
  profileVisibilityController,
  getPublicProfilesController
} = require("../controllers/userControllers");

router.get("/users/profile", authenticateToken, getProfileInfoController);
router.patch("/users/profileVisibilty", authenticateToken, profileVisibilityController);
router.patch("/users/publicProfiles", getPublicProfilesController);

module.exports = router;