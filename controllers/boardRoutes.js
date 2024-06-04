const express = require("express");
const router = express.Router();
const { Board, List, Task, Comment, User_s } = require("../models");

// Get all boards with their associated  tasks
router.get("/", async (req, res) => {
    try {
        //Get all the boards(only need 1 currently) -
        const boardsData = await Board.findAll();
        const boards = boardsData.map((board) => board.get({ plain: true }));

        // //Get all the lists for that board  (remove when above task completed)
        const listsData = await List.findAll({
            where: {
                board_id: boards[0].id,
            },
            order: [
                ["id"]
            ],
            include: {
                model: Task,
                include: {
                    model: Comment,
                    include: {
                        model: User_s,
                    },
                },
            },
        });
        const lists = listsData.map((list) => list.get({ plain: true }));
        const userData = await User_s.findAll();
        const allUsers = userData.map((board) => board.get({ plain: true }));

        const statusData = await Task.findAll();
        const allStatusesWithDuplicates = statusData.map(
            (board) => board.get({ plain: true }).status
        );

        function removeDuplicates(arr) {
            return arr.filter((item, index) => arr.indexOf(item) === index);
        }

        const allStatuses = removeDuplicates(allStatusesWithDuplicates);
        //Get all the tasks for the board
        res.render("board", {
            lists,
            allUsers,
            allStatuses,
            username: req.session.username,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single board by ID with its tasks
router.get("/:id", async (req, res) => {
    try {
        const boardData = await Board.findByPk(req.params.id, {
            include: [{ model: Task }],
        });

        if (!boardData) {
            return res.status(404).json({ error: "Board not found" });
        }

        const board = boardData.get({ plain: true });
        res.json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new board
router.post("/", async (req, res) => {
    try {
        const { name, user_id } = req.body;
        const newBoard = await Board.create({ name, user_id });
        res.status(200).json(newBoard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a board by ID
router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const board = await Board.findByPk(req.params.id);
        if (!board) {
            return res.status(404).json({ error: "Board not found" });
        }
        board.name = name;
        await board.save();
        res.json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a board by ID
router.delete("/:id", async (req, res) => {
    try {
        const board = await Board.findByPk(req.params.id);
        if (!board) {
            return res.status(404).json({ error: "Board not found" });
        }
        await board.destroy();
        res.json({ message: "Board deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all lists
router.get("/lists", async (req, res) => {
    try {
        const lists = await List.findAll({
            order: [
                ["id"]
            ]
        });
        res.json(lists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
