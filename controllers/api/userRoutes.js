const router = require("express").Router();
const { User } = require("../../models");

const signupRoutes = require("../signupRoutes");

// create new user
router.post("/signup", async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// existing user login
router.post("/login", async (req, res) => {
    try {
        console.log("userRoutes login started");
        const userData = await User.findOne({
            where: { email: req.body.email },
        });
        console.log("userRoutes login", userData);

        if (!userData) {
            res.status(400).json({
                message: "Incorrect email or password, please try again",
            });
            return;
        }

        const validatePassword = await userData.checkPassword(
            req.body.password
        );

        if (!validatePassword) {
            res.status(400).json({
                message: "Incorrect email or password, please try again",
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// change username
router.put("/new-username", async (req, res) => {
    try {
        const userData = await User.update(
            {
                name: req.body.newUsername,
            },
            { where: { id: req.session.user_id } }
        );

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// change email
router.put("/new-email", async (req, res) => {
    try {
        const userData = await User.update(
            {
                email: req.body.newEmail,
            },
            { where: { id: req.session.user_id } }
        );

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// change password
router.put("/new-password", async (req, res) => {
    try {
        const userData = await User.update(
            {
                name: req.body.newPassword,
            },
            { where: { id: req.session.user_id } }
        );

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// user logout
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
