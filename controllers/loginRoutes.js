const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
    try {
        const userData = await User.findAll();
        if (!userData) {
            res.status(400).json({ message: "No users." });
        }

        const users = userData.map((user) => user.get({ plain: true }));

        console.log(users);

        res.render("login", {
            title: "Current Users",
            users,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
