const express = require("express");
const router = express.Router();
const { Board, List, Task } = require("../models");

//GET task by id
router.get("/:id", async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id);
    const task = taskData.get({ plain: true });

    //Get all the tasks for the board
    res.render("edit-task-popup", {
      task,
      username: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { status, user_id, due_date } = req.query;

    // Create a filter object
    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (user_id) {
      filter.user_id = user_id;
    }

    if (due_date) {
      filter.dueDate = due_date;
    }

    const tasks = await Task.findAll({
      where: filter,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task's list
router.put("/:id/move", async (req, res) => {
  try {
    const { list_id } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.list_id = list_id;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
