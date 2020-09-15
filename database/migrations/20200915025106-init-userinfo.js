'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING , VARCHAR} = Sequelize;
    await queryInterface.createTable('userinfo', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      token: STRING(30),
      phone: STRING(30),
      lastLogin: STRING(30),
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('userinfo');
  }
};
