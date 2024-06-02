const router = require("express").Router();
const { User } = require("../../models");
const checkAuthorisation = require("../../utils/authorisation");

const signupRoutes = require("../signupRoutes");

// create new user
router.post("/signup", async (req, res) => {
    try {
        console.log("this is reckedup body ", req.body);
        const userData = await User.create(req.body);
        res.json(userData);
    } catch (err) {
        console.log(err);
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
            req.session.username = userData.name;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// change username
router.put("/new-username", checkAuthorisation, async (req, res) => {
    try {
        console.log(req.body.newUsername);
        const userData = await User.update(
            {
                name: req.body.newUsername,
            },
            { where: { id: req.session.user_id } }
        );

        req.session.save(() => {
            req.session.username = req.body.newUsername;

            res.status(200).json({
                user: userData,
                message: "Username updated successfully",
            });
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// change email
router.put("/new-email", checkAuthorisation, async (req, res) => {
    try {
        const userData = await User.update(
            {
                email: req.body.newEmail,
            },
            { where: { id: req.session.user_id } }
        );

        res.status(200).json({
            user: userData,
            message: "Email updated successfully",
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// change password
router.put("/new-password", checkAuthorisation, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id);

        if (userData) {
            const validatePassword = await userData.checkPassword(
                req.body.currentPassword
            );
            if (!validatePassword) {
                res.status(400).json({
                    message: "Incorrect password, please try again",
                });
                return;
            } else {
                await userData.update({ password: req.body.newPassword });
                res.status(200).json({
                    message: "Password updated successfully",
                });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// user logout
router.post("/logout", checkAuthorisation, (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
