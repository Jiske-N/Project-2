const express = require("express");
const router = express.Router();
const { User } = require("../models");
// const checkAuthorisation = require("../utils/authorisation");

// display account settings with options to change thisUser details
// router.get("/", async (req, res) => {
router.get("/", async (req, res) => {
    console.log("accountRoutes", "initialising");
    try {
        // const username = req.session.username;
        const userId = req.session.user_id;

        const userData = await User.findByPk(userId);

        const thisUser = userData.get({ plain: true });

        // console.log("accountRoutes", userId, thisUser, "Test");
        // // const test
        // console.log("Game Changer?", req.user.name, req.username, username);

        res.render("accountSettings", {
            thisUser,
            header_title: "Account Settings",
            username: req.session.username,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
