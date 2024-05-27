const express = require("express");
const router = express.Router();
const { Board, Task } = require("../models");

// Get all boards with their tasks
router.get("/", async (req, res) => {
  try {
    const boardsData = await Board.findAll({
      include: [{ model: Task }],
    });

    const boards = boardsData.map((board) => board.get({ plain: true }));

    res.render("board", { boards });
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
    const { name, userId } = req.body;
    const newBoard = await Board.create({ name, userId });
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

module.exports = router;
