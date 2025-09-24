'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataChallenge = JSON.parse(await fs.readFile("./data/question.json", "utf-8"));

    const result = dataChallenge.map(el => {

      createdAt = updatedAt = new Date()

      return el
    })

    await queryInterface.bulkInsert('Challenges', result)
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

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Challenges', null, {})
  }
};
