const router = require("express").Router();
const { User } = require("../../models");

const userController = require("../userController");

// create new user
router.post("/", async (req, res) => {
    try {
        console.log("userRoutes createNew started");
        const userData = await User.create(req.body);
        console.log("userRoutes createNew", userData);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (error) {
        res.status(400).json(error);
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

// Route to sign up a new user
// the post route on line 6 should do this
router.post("/signup", userController.signUp);

module.exports = router;
