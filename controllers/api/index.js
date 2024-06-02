const router = require("express").Router();

const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const checkAuthorisation = require("../../utils/authorisation");

router.use("/users", userRoutes);
router.use("/tasks", checkAuthorisation, taskRoutes);

module.exports = router;
