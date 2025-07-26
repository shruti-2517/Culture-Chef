const express = require("express");
const router = express.Router();

const {
  getProfileInfoController,
  profileVisibilityController
} = require("../controllers/userControllers");

router.get("/users/profile", getProfileInfoController);
router.patch("/users/profileVisibilty", getProfileInfoController);

module.exports = router;