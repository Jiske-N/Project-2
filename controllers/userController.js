const express = require("express");
const router = express.Router();
// Import the User model
const { User } = require('../models');

// Sign up a new user
const signUp = async function(req, res) {
    try {
        const { username, email, password } = req.body;
        
        // Create a new user in the database
        const newUser = await User.create({ name: username, email, password });
        
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Unable to sign up' });
    }
};

module.exports = { signUp };