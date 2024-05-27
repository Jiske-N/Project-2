const router = require("express").Router();
const welcomeRoutes = require("./welcomeRoutes");
const loginRoutes = require("./loginRoutes");
const apiRoutes = require("./api");

router.use("/", welcomeRoutes);
router.use("/login", loginRoutes);
router.use("/api", apiRoutes);

module.exports = router;
