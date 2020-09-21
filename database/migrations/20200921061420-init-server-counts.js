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
    await queryInterface.createTable('server_counts', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      res_code: STRING(255),
      res_message: STRING(255),
      res_data: DATE,
      req: STRING(255),
      machine_id:STRING(255),
      use_time: STRING(255),
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
    await queryInterface.dropTable('server_counts');
  }
};
