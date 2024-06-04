const express = require("express");
const router = express.Router();
const { Board, List, Task, Comment, User_s } = require("../models");
const { where } = require("sequelize");
const { Op } = require("sequelize");

// GET task by id
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

// filter tasks based on search
// router.get("/search", async (req, res) => {
//     try {
//         console.log("taskRoutes.js", "starting");
//         const { name, status, date } = req.query;

//         console.log("taskRoutes.js", "req.query", req.query);

//         let filter = {};

//         if (status && status !== "") {
//             filter.statuss = status;
//         }

//         if (name && name !== "") {
//             const user = await User_s.findOne({
//                 where: {
//                     name,
//                 },
//             });
//             if (user) {
//                 filter.user_id = user.id;
//             }
//         }

//         if (date && date !== "") {
//             filter.due_date = date;
//         }

//         console.log("taskRoutes.js", "filter", filter);

//         const boardsData = await Board.findAll();
//         const boards = boardsData.map((board) => board.get({ plain: true }));

//         const listsData = await List.findAll({
//             where: {
//                 board_id: boards[0].id,
//             },
//             include: {
//                 model: Task,
//                 where: {
//                     [Op.and]: [
//                         filter.statuss && { status: filter.statuss },
//                         filter.user_id && { user_id: filter.user_id },
//                         filter.due_date && { due_date: filter.due_date },
//                     ].filter(Boolean), // Remove falsy values
//                 },
//                 include: {
//                     model: Comment,
//                     include: {
//                         model: User_s,
//                     },
//                 },
//             },
//         });

//         const lists = listsData.map((list) => list.get({ plain: true }));
//         console.log("taskRoutes.js", "lists", lists);

//         res.render("task", {
//             lists,
//             username: req.session.username,
//             logged_in: req.session.logged_in,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

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
