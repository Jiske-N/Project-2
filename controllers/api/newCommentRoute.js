
const router = require('express').Router();
const { Comment } = require('../../models');

//POST route to create a new comment on a post
router.post('/', async (req, res) => {
    try {

        await Comment.create({
            comment: req.body.comment,
            task_id: req.body.taskId,
            user_id: req.session.user_id
        }).then((newTask) => {
            res.json(newTask)
        })
    } catch (err) {
        console.error(err)
    }
})




module.exports = router;
