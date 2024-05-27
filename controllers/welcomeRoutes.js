const router = require('express').Router();

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('welcome');
});

//GET the board route
router.get('/board', async (req, res) => {
  res.render('board')
})

module.exports = router;

