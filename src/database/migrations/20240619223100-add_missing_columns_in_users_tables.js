"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn("users", "created_at", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("users", "updated_at", {
        type: Sequelize.DATE,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("users", "created_at"),
      queryInterface.removeColumn("users", "updated_at"),
    ]);
  },
};
