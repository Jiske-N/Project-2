const router = require("express").Router();

router.get("/", async (req, res) => {
    // Send the rendered Handlebars.js template back as the response
    const username = req.session.username;
    console.log(username);
    res.render("welcome", {
        username,
        logged_in: req.session.logged_in,
    });
});

// //GET the board route
// router.get('/board', async (req, res) => {
//   res.render('board')
// })

module.exports = router;
