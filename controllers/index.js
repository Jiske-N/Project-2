const router = require("express").Router();
const welcomeRoutes = require("./welcomeRoutes");
const loginRoutes = require("./loginRoutes");
const apiRoutes = require("./api");
const boardRoutes = require("./boardRoutes");

router.use("/", welcomeRoutes);
router.use("/login", loginRoutes);
router.use("/api", apiRoutes);
router.use("/board", boardRoutes);

module.exports = router;
