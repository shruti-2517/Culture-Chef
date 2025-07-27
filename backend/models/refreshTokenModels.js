const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    token: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 7
    }
  },
  { timestamps: false }
);

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
