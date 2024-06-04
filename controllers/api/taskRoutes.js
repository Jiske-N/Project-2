
const router = require('express').Router();
const { Task, List } = require('../../models');

//POST route to create a new task
router.post('/', async (req, res) => {
    try {
        const listData = await List.findByPk(req.body.listId);
        const list = listData.get({ plain: true });

        console.log(req.session)
        await Task.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id,
            due_date: req.body.dueDate,
            list_id: req.body.listId,
            status: list.name
        }).then((newTask) => {
            res.json(newTask)
        })
    } catch (err) {
        console.error(err)
    }
})

//PUT route to edit a task
router.put('/:id', async (req, res) => {
    try {
        await Task.update({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.dueDate,
        }, {
            where: {
                id: req.params.id
            }
        })
    } catch (err) {
        console.error(err)
    }
});

//DELETE route to edit a task
router.delete('/:id',  (req, res) => {

    try {
         Task.destroy({
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
