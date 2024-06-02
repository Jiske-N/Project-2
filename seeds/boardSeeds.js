const { Board } = require("../models");

const boardData = [
  {
    name: "User1 Board 1",
    userId: 1,
  },
  {
    name: "User1 Board 2",
    userId: 1,
  },
  {
    name: "User2 Board 1",
    userId: 2,
  },
  {
    name: "User2 Board 2",
    userId: 2,
  },
  {
    name: "User3 Board 1",
    userId: 3,
  },
  {
    name: "User3 Board 2",
    userId: 3,
  },
];

const seedBoards = () => Board.bulkCreate(boardData);

module.exports = seedBoards;
