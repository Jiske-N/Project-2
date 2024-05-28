const router = require("express").Router();
const { User } = require("../../models/User");

const userController = require("../userController");

// create new user
router.post("/", async (req, res) => {
    try {
        // console.log('userRoutes createNew started');
        const userData = await User.create(req.body);
        // console.log('userRoutes createNew', userData);
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
        const userData = await User.findOne({
            where: { email: req.body.email },
        });

        if (!userData) {
            res.status(400).json({
                message: "Incorrect email or password, please try again",
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
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
        res.status(400).json(error);
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
