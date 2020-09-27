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
    await queryInterface.createTable('admin_users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      role: STRING(255),
      user_name:{ type: STRING(255), primaryKey: true },
      password: STRING(255),
      email: STRING(255),
      phone: STRING(255),
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
    await queryInterface.dropTable('admin_users');
  }
};
