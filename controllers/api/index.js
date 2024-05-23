const router = require('express').Router();
const welcomeRoutes = require('./welcomeRoutes');

router.use('/', welcomeRoutes);

module.exports = router;

