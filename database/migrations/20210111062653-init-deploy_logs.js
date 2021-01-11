'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING, JSON } = Sequelize;
    await queryInterface.createTable('deploy_logs', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      other_info:JSON,
      user:STRING(40),
      target:STRING(255),
      log_action:STRING(255),
      created_at: DATE,
      updated_at: DATE,
      deleted_at:DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('deploy_logs');
  }
};
