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
    },
    public: {
      type: Boolean,
      required: true,
      default: false
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Users", userSchema);