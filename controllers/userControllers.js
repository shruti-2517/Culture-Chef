const User = require("../models/authModels");

exports.getProfileInfoController = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findOne({ userId }, { email: 1, name: 1, public: 1 });
    if (!user) {
        return res.status(401).json({ error: "Cannot retrieve profile information" });
    }
    return res.status(200).json({ user });
};

exports.profileVisibilityController = async (req, res) => {
    const userId = req.user._id;
    const { public } = req.body;
    const updatedUser = await User.findOneAndUpdate({ userId }, { $set: { public: public } }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ error: "User not found or update failed" });
    }
    return res.status(200).json({ message: "Visibilty updated" });
};

exports.getPublicProfilesController = async (req, res) => {
    const users = await User.find({ public: true });
    if (!users.length === 0) {
        return res.status(401).json({ error: "Np public profiles found" });
    }
    return res.status(200).json({ users });
};