"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          uuid: uuidv4(),
          firstName: "John",
          lastName: "Doe",
          email: "demo@demo.com",
          password: "password",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: "Jane",
          lastName: "Smith",
          email: "demo2@demo.com",
          password: "password",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: "Jane",
          lastName: "Smith the second",
          email: "demo3@demo.com",
          password: "password",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
