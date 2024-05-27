const { User } = require("../models");

const userData = [
    {
        name: "John Doe",
        email: "john@gmail.com",
    },
    {
        name: "Bob Williams",
        email: "bob@gmail.com",
    },
    {
        name: "Shannon Jackson",
        email: "shannon@gmail.com",
    },
];

const seedUsers = async () => {
    console.log("seedUsers function started");
    User.bulkCreate(userData);
};

module.exports = seedUsers;
