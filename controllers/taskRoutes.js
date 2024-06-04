const express = require("express");
const router = express.Router();
const { Board, List, Task, Comment, User_s } = require("../models");
const { where } = require("sequelize");

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

// filter tasks based on search
router.get("/", async (req, res) => {
    try {
        console.log("taskRoutes.js", "starting");
        const { name, status, date } = req.query;

        console.log("taskRoutes.js", "req.query", req.query);

        // console.log("taskRoutes.js", "user", user);

        let filter = {};

        if (status && status !== "") {
            filter.status = status;
        }

        if (name && name !== "") {
            const user = await User_s.findOne({
                where: {
                    name,
                },
            });
            if (user) {
                filter.user_id = user.id;
            }
        }

        if (date && date !== "") {
            filter.due_date = date;
        }

        console.log("taskRoutes.js", "filter", filter);

        const boardsData = await Board.findAll();
        const boards = boardsData.map((board) => board.get({ plain: true }));

        const listsData = await List.findAll({
            where: {
                board_id: boards[0].id,
            },
            include: {
                model: Task,
                where: filter,
                include: {
                    model: Comment,
                    include: {
                        model: User_s,
                    },
                },
            },
        });

        const lists = listsData.map((list) => list.get({ plain: true }));
        console.log("taskRoutes.js", "lists", lists);

        res.render("board", {
            lists,
            username: req.session.username,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// router.get("/", async (req, res) => {
//     try {
//         const { name, status, date } = req.query;

//         const getUser = await User_s.findOne({
//             where: {
//                 name: name,
//             },
//         });

//         const status = await Task.findAll({
//             where: {
//                 status: status,
//             },
//         });

//         const due_date = await Task.findAll({
//             where: {
//                 due_date: date,
//             },
//         });

//         const user_id = getUser.id;

//         // Create a filter object
//         let filter = {};

//         if (status) {
//             filter.status = status;
//         }

//         if (user_id) {
//             filter.user_id = user_id;
//         }

//         if (due_date) {
//             filter.dueDate = due_date;
//         }

//                 const listsData = await List.findAll({
//                   where: {
//                       board_id: boards[0].id,
//                   },
//                   include: {
//                       model: Task{
//                         where:filter,
//                       },
//                       include: {
//                           model: Comment,
//                           include: {
//                               model: User_s,
//                           },
//                       },
//                   },
//               });
//               const lists = listsData.map((list) => list.get({ plain: true }));

//               //Get all the tasks for the board
//               res.render("board", {
//                   lists,
//                   username: req.session.username,
//                   logged_in: req.session.logged_in,
//               });
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
