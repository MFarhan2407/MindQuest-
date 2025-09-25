'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Challenges', 'SubjectId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Subjects",
        key: 'id',
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      
    })
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
},

  async down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Challenges', 'SubjectId')
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
}
};
