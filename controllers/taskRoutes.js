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
     task
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


module.exports = router;
