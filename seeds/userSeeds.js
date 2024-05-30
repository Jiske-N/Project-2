const { User } = require("../models");

const userData = [
    {
        name: "John Doe",
        email: "john@gmail.com",
        password: "Password1234!",
    },
    {
        name: "Bob Williams",
        email: "bob@gmail.com",
        password: "Password1234!",
    },
    {
        name: "Shannon Jackson",
        email: "shannon@gmail.com",
        password: "Password1234!",
    },
];

const seedUsers = async () => {
    console.log("seedUsers function started");
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
};

module.exports = seedUsers;
