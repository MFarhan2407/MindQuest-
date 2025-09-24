'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username:  "tidar",
        email: 'tidar@mail.com',
        password: bcrypt.hashSync("tidar", 10),
        role: 'EDUCATOR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username:  "farhan",
        email: 'farhan@mail.com',
        password: bcrypt.hashSync("farhan", 10),
        role: 'EDUCATOR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username:  "nevin",
        email: 'nevin@mail.com',
        password: bcrypt.hashSync("nevin", 10),
        role: 'STUDENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username:  "elestial",
        email: 'elestial@mail.com',
        password: bcrypt.hashSync("elestial", 10),
        role: 'STUDENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
