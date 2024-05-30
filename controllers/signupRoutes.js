const express = require("express");
const router = express.Router();
const { User } = require("../models");


router.post("/signup", async (req, res) => {
    try {
        const userData = await User.findAll();
        if (!userData) {
            res.status(400).json({ message: "sign up error." });
        }
    
        console.log(users);

        res.render("signup", {
        });
    } catch (error) {
        res.status(500).json(error);
    }

    try {
        const userData = await User.findAll();
        if (!userData) {
            res.status(400).json({ message: "sign up error." });
        }

        const users = userData.map((user) => user.get({ plain: true }));

        console.log(users);

        res.render("signup", {
            title: "Current Users",
            users, 
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
