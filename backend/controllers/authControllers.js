const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/authModels");
require("dotenv").config();

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
};

exports.signupController = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Enter all details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User Already Exists" });
    }

    const existingUserWithName = await User.findOne({ name });
    if (existingUserWithName) {
        return res.status(400).json({ error: "Username is Already Taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const payload = { id: newUser._id };
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ accessToken });
};

exports.loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ error: "Wrong Credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: "Wrong Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Wrong Credentials" });
    }

    const payload = { id: user._id };
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
};


exports.tokenController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const db = connection.db("culture-chef");
    const tokenCollection = db.collection("REFRESH TOKENS");

    const tokenExists = await tokenCollection.findOne({ token: refreshToken });
    if (!tokenExists) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ id: user.id });
        return res.json({ accessToken });
    });
};

exports.logoutController = async (req, res) => {
    const { token } = req.body;

    const db = connection.db("culture-chef");
    const tokenCollection = db.collection("REFRESH TOKENS");

    await tokenCollection.deleteOne({ token });
    return res.sendStatus(200);
};
