'use strict';

const fs = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataSubject = JSON.parse(await fs.readFile("./data/subject.json", "utf-8"));

    const result = dataSubject.map(el => {

      el.createdAt = el.updatedAt = new Date()

      return el
    })

    await queryInterface.bulkInsert('Subjects', result)
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
    await queryInterface.bulkDelete('Subjects', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
