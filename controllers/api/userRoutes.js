const router = require("express").Router();
const { User } = require("../../models");
const checkAuthorisation = require("../../utils/authorisation");

// create new user
router.post("/signup", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        // confirm user was created
        if (!userData) {
            res.status(404).json({
                message: "Error creating user",
            });
            // return is not necessary but is used as an indicator that the function exits
            return;
        }

        // autologin/saved created users data to session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.name;

            res.json({ user: userData, message: "New user created" });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// existing user login
router.post("/login", async (req, res) => {
    try {
        // find user whos login matches email from input
        const userData = await User.findOne({
            where: { email: req.body.email },
        });

        // confirm user exists
        if (!userData) {
            res.status(404).json({
                message: "Incorrect email or password, please try again",
            });
            // return is not necessary but is used as an indicator that the function exits
            return;
        }

        // check if password entered matches saved password
        const validatePassword = await userData.checkPassword(
            req.body.password
        );

        // cancel login if password doesn't match
        if (!validatePassword) {
            res.status(404).json({
                message: "Incorrect email or password, please try again",
            });
            // return is not necessary but is used as an indicator that the function exits
            return;
        }

        // user is logged in and their details are saved to the session
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
        // select user to update
        const userData = await User.update(
            {
                name: req.body.newUsername,
            },
            { where: { id: req.session.user_id } }
        );

        // confirm user exists
        if (!userData) {
            res.status(404).json({
                message: "User not found",
            });
            // return is not necessary but is used as an indicator that the function exits
            return;
        }

        // save updated username to the session so navbars update
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
        // select user to update
        const userData = await User.update(
            {
                email: req.body.newEmail,
            },
            { where: { id: req.session.user_id } }
        );

        // confirm user exists
        if (!userData) {
            res.status(404).json({
                message: "User not found",
            });
            // return is not necessary but is used as an indicator that the function exits
            return;
        }

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
        // select user to update
        const userData = await User.findByPk(req.session.user_id);

        // confirm user exists
        if (userData) {
            // check old password matches saved value
            const validatePassword = await userData.checkPassword(
                req.body.currentPassword
            );

            if (!validatePassword) {
                // end function if passwords don't match
                res.status(400).json({
                    message: "Incorrect password, please try again",
                });
                // return is not necessary but is used as an indicator that the function exits
                return;
            } else {
                // update the password
                await userData.update({ password: req.body.newPassword });
                res.status(200).json({
                    message: "Password updated successfully",
                });
            }
        } else {
            res.status(404).json({ message: "User not found" });
            // return is not necessary but is used as an indicator that the function exits
            return;
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
