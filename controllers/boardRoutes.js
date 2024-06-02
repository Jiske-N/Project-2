const express = require("express");
const router = express.Router();
const { Board, List, Task, Comment, User } = require("../models");

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
            include: {
                model: Task,
                include: {
                    model: Comment,
                    include: {
                        model: User,
                    },
                },
            },
        });
        const lists = listsData.map((list) => list.get({ plain: true }));

        //Get all the tasks for the board
        res.render("board", {
            lists,
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

// List routes
// Get all lists
router.get("/lists", async (req, res) => {
    try {
        const lists = await List.findAll();
        res.json(lists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new list
router.post("/lists", async (req, res) => {
    try {
        const { name, boardId } = req.body;
        const newList = await List.create({ name, boardId });
        res.status(200).json(newList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a list by ID
router.put("/lists/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const list = await List.findByPk(req.params.id);
        if (!list) {
            return res.status(404).json({ error: "List not found" });
        }
        list.name = name;
        await list.save();
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a list by ID
router.delete("/lists/:id", async (req, res) => {
    try {
        const list = await List.findByPk(req.params.id);
        if (!list) {
            return res.status(404).json({ error: "List not found" });
        }
        await list.destroy();
        res.json({ message: "List deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
