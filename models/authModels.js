require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: String,
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '0.5h' });
}

module.exports = { authenticateToken, generateAccessToken };
module.exports = mongoose.model("Users", userSchema);