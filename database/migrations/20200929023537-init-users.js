'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      idcard: STRING(30),
      token: STRING(255),
      login_mode:STRING(255),
      terminalid:STRING(255),
      hisuserid:STRING(255),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
