
const router = require('express').Router();
const { Task } = require('../../models');

//POST route to create a new task
router.post('/', async (req, res) => {
    try {
        await Task.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.body.user,
            due_date: req.body.dueDate,
            status: req.body.status
        }).then((newTask) => {
            res.json(newTask)
        })
    } catch (err) {
        console.error(err)
    }
})

//PUT route to edit a task
router.post('/:id', async (req, res) => {
    try {
        await Task.update({
            title: req.body.title,
            description: req.body.description,
            user_id: req.body.user,
            due_date: req.body.dueDate,
            status: req.body.status
        })
    } catch (err) {
        console.error(err)
    }
});

//DELETE route to edit a task
router.delete('/id', async (req, res) => {
    try {
        await Task.destroy({
            where: {
                id: req.params.id
            },
        })      .then((deletedPost) => {
            res.json(deletedPost);
          })
    } catch (err) {
        console.error(err)
    }
})



module.exports = router;
