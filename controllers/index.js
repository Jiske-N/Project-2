const router = require("express").Router();
const welcomeRoutes = require("./welcomeRoutes");
const loginRoutes = require("./loginRoutes");
const signupRoutes = require("./signupRoutes");
const apiRoutes = require("./api");
const boardRoutes = require("./boardRoutes");
const accountRoutes = require("./accountRoutes");
const taskRoutes = require("./taskRoutes");
// const { User } = require("../models");
const checkAuthorisation = require("../utils/authorisation");

// router.use(async (req, _res, next) => {
//     if (req.session.user_id) {
//         const user = await User.findByPk(req.session.user_id);
//         req.user = user;
//     }
//     next();
// });

router.use("/", welcomeRoutes);
router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/api", apiRoutes);
router.use("/board", checkAuthorisation, boardRoutes);
// router.use("/signup", userController);
router.use("/account", checkAuthorisation, accountRoutes);
router.use("/task", checkAuthorisation, taskRoutes);
module.exports = router;
