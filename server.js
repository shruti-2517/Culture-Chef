require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const connectDB = require("./db/db.js");
const recipeRoutes = require("./routes/recipeRoutes");

const server = express();
server.use(cors());
server.use(express.json());
server.use(cookieParser());

connectDB();

server.use("/", authRoutes);
server.use("/", geminiRoutes);
server.use("/", recipeRoutes);
server.use("/", userRoutes);

server.listen(8000, '0.0.0.0', () => {
    console.log("Server is connected and listening on port 8000")
})



