
const router = require('express').Router();
const { Task } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newTask = await Task.create(req.body)
        console.log(newTask)
    } catch (err) {
        console.error(err)
    }
})



module.exports = router;
