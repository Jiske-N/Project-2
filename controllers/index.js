
const router = require('express').Router();

const welcomeRoutes = require('./welcomeRoutes');
const apiRoutes = require('./api')

router.use('/', welcomeRoutes);
router.use('/api', apiRoutes)

module.exports = router;
