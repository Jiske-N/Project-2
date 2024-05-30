const Board = require("./Board");
const User = require("./User");
const Task = require("./Task");
const Tag = require("./Tag");
const Comment = require("./Comment");
const List = require('./List');
//Each User can have many Boards
// User.hasMany(Board, {
//     foreignKey: "user_id",
//     onDelete: "CASCADE",
// });

// Board.belongsTo(User, {
//     foreignKey: "user_id",
// });

//Each Board can have many Tasks
Board.hasMany(Task, {
    foreignKey: "board_id",
    onDelete: "CASCADE",
});

Task.belongsTo(Board, {
    foreignKey: "board_id",
});

//Each User can have have many tasks
User.hasMany(Task, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Task.belongsTo(User, {
    foreignKey: "user_id",
});

//Each User can have have many tasks
User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
});

Board.hasMany(List, {
    foreignKey: 'board_id'
})

List.belongsTo(Board, {
    foreignKey: "board_id"
})
//GM TO DO
//One task has many comments
//One comment has one task
//One task has many tags
//One tag can have many tasks (many to many)
module.exports = { User, Board, Task, Tag, Comment, List };
