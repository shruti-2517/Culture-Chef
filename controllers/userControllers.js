const User = require("../models/authModels");

exports.getProfileInfoController = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findOne({ userId }, { email: 1, name: 1, public: 1});
    if (!user) {
        return res.status(401).json({ error: "Cannot retrieve profile information" });
    }
     return res.status(200).json({ user });
};

exports.profileVisibilityController = async (req, res) => {
    const userId = req.user._id;
    const public = req.public;
    await User.findOneAndUpdate({ userId }, { $set: { public: public } });
    if (!user) {
        return res.status(401).json({ error: "Cannot change profile visibility" });
    }
    return res.status(200).json({message: "Visibilty updated"});
};