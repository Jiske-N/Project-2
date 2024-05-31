const sequelize = require("../config/connection");

const { User, Board, List, Task, Comment } = require('../models');
const seedUsers = require("./userSeeds.json");
const seedLists = require('./listSeeds.json');
const seedTasks = require('./taskSeeds.json');
const seedComments = require('./commentSeeds.json');

const seedDatabase = async () => {
    console.log("Seed file initialising");
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(seedUsers, {
        individualHooks: true,
        returning: true,
      });
    
    const setUser = users[Math.floor(Math.random() * users.length)].id;

    await Board.create({
          name: "Task Board",
          user_id: 1
      
        });

      for (const list of seedLists) {
        await List.create({
          ...list,
          user_id: setUser,
          board_id: 1
        });
      }

      for (const task of seedTasks) {
        await Task.create({
          ...task,
          user_id: users[Math.floor(Math.random() * users.length)].id,

        });
      }

      for (const comment of seedComments) {
        await Comment.create({
          ...comment,

        });
      }

    
     process.exit(0);
};


seedDatabase();
