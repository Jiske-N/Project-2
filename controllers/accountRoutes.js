const express = require("express");
const router = express.Router();
const { User_s } = require("../models");

// display account settings with options to change thisUser's details
router.get("/", async (req, res) => {
    console.log("accountRoutes", "initialising");
    try {
        const userId = req.session.user_id;

        const userData = await User_s.findByPk(userId);

        const thisUser = userData.get({ plain: true });

        res.render("accountSettings", {
            thisUser,
            // header_title: "Account Settings",
            username: req.session.username,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
