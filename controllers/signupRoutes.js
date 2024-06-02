const express = require("express");
const router = express.Router();
const { User } = require("../models");


// Render the signup form
router.get("/", async (req, res) => {
    try {
        res.render("signup"); // Assuming you have a view named "signup"
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
