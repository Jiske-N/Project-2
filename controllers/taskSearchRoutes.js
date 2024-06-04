const express = require("express");
const router = express.Router();
const { Board, List, Task, Comment, User_s } = require("../models");
const { Op } = require("sequelize");

// filter tasks based on search
router.get("/", async (req, res) => {
    try {
        console.log("taskRoutes.js", "starting");
        const { name, status, date } = req.query;

        console.log("taskRoutes.js", "req.query", req.query);

        let filter = {};

        if (status && status !== "") {
            filter.statuss = status;
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
                where: {
                    [Op.and]: [
                        filter.statuss && { status: filter.statuss },
                        filter.user_id && { user_id: filter.user_id },
                        filter.due_date && { due_date: filter.due_date },
                    ].filter(Boolean), // Remove falsy values
                },
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

        res.render("task", {
            lists,
            username: req.session.username,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
