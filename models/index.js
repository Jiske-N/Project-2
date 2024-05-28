const Board = require("./Board");
const User = require("./User");
const Task = require("./Task");
const Tag = require("./Tag");
const Comment = require("./Comment");
//Each User can have many Boards
User.hasMany(Board, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Board.belongsTo(User, {
    foreignKey: "userId",
});

//Each Board can have many Tasks
Board.hasMany(Task, {
    foreignKey: "boardId",
    onDelete: "CASCADE",
});

Task.belongsTo(Board, {
    foreignKey: "boardId",
});

//Each User can have have many tasks
User.hasMany(Task, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Task.belongsTo(User, {
    foreignKey: "userId",
});

//Each User can have have many tasks
User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Comment.belongsTo(User, {
    foreignKey: "userId",
});
//GM TO DO
//One task has many comments
//One comment has one task
//One task has many tags
//One tag can have many tasks (many to many)
module.exports = { User, Board, Task, Tag, Comment };
