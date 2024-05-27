const sequelize = require("../config/connection");
const seedUsers = require("./userData");

const seedDatabase = async () => {
    console.log("Seed file initialising");
    await sequelize.sync({ force: true });

    console.log("\n Database Synced \n");
    await seedUsers();
    console.log("\n Users Seeded \n");

    // process.exit(0);
};

seedDatabase();
