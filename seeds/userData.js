const { User } = require("../models");

const userData = [
    {
        name: "John Doe",
        email: "john@gmail.com",
        password: "password1"
    },
    {
        name: "Bob Williams",
        email: "bob@gmail.com",
        password: "password1"
    },
    {
        name: "Shannon Jackson",
        email: "shannon@gmail.com",
        password: "password1"
    },
];

const seedUsers = async () => {
    console.log("seedUsers function started");
    User.bulkCreate(userData);
};

module.exports = seedUsers;
