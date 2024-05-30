const express = require("express");
const router = express.Router();
const { User } = require("../models");

const checkAuthorisation = require("../utils/authorisation");

// display account settings with options to change user details
// router.get("/", async (req, res) => {
router.get("/", checkAuthorisation, async (req, res) => {
    console.log("accountRoutes", "initialising");
    try {
        const userId = req.session.user_id;

        const userData = await User.findByPk(userId);

        const user = userData.get({ plain: true });

        console.log("accountRoutes", userId, user, "Test");

        res.render("accountSettings", {
            user,
            header_title: "Account Settings",
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
