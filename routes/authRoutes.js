const express = require("express");
const router = express.Router();

const {
  signupController,
  loginController,
  tokenController,
  logoutController
} = require("../controllers/authControllers");

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/token", tokenController);
router.delete("/logout", logoutController);

module.exports = router;
