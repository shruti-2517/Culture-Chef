const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./db/db.js");

const server = express();
server.use(cors());
server.use(express.json());
server.use(cookieParser());

connectDB();

server.use("/", authRoutes);

server.listen(8000, '0.0.0.0', () => {
    console.log("Server is connected and listening on port 5000")
})