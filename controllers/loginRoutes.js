const express = require("express");
const router = express.Router();
const { User } = require("../models");

// render login page
router.get("/", async (req, res) => {
    try {
        // confirm at least one user exists
        // confirm with tri? is it better to have this check or remove it under the assumption that one does to improve performance
        const userData = await User.findAll();
        if (!userData) {
            res.status(400).json({ message: "No users." });
        }

        res.render("login");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
