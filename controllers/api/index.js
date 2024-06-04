const router = require("express").Router();

const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const commentRoutes = require('./newCommentRoute');
const listRoutes = require('./listRoutes')
const checkAuthorisation = require("../../utils/authorisation");

router.use("/users", userRoutes);
// require logged_in to access all taskroutes
router.use("/tasks", checkAuthorisation, taskRoutes);
router.use('/comment', commentRoutes);
router.use('/list', listRoutes);

module.exports = router;
