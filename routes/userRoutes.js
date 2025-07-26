const express = require("express");
const router = express.Router();

const {
  getProfileInfoController,
  profileVisibilityController,
  getPublicProfilesController
} = require("../controllers/userControllers");

router.get("/users/profile", getProfileInfoController);
router.patch("/users/profileVisibilty", getProfileInfoController);
router.patch("/users/publicProfiles", getPublicProfilesController);

module.exports = router;