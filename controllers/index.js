const router = require("express").Router();
const welcomeRoutes = require("./welcomeRoutes");
const loginRoutes = require("./loginRoutes");
const signupRoutes = require("./signupRoutes");
const apiRoutes = require("./api");
const boardRoutes = require("./boardRoutes");
const accountRoutes = require("./accountRoutes");
const taskRoutes = require("./taskRoutes");
const { User } = require("../models");

// router.use(async (req, _res, next) => {
//     // if (req.session.username) {
//     //     const username = await User.findByPk(req.session.user_id);
//     //     req.user = user;
//     // }
//     if (req.session.user_id) {
//         const user = await User.findByPk(req.session.user_id);
//         req.user = user;
//         const username = req.session.username;
//         req.username = username;
//     }
//     next();
// });

router.use("/", welcomeRoutes);
router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/api", apiRoutes);
router.use("/board", boardRoutes);
// router.use("/signup", userController);
router.use("/account", accountRoutes);
router.use("/task", taskRoutes);
module.exports = router;
