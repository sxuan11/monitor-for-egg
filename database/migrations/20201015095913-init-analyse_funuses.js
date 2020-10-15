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
    await queryInterface.createTable('analyse_funuses', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      funuse_data:JSON,
      fun_average_time:JSON,
      date:DATE,
      counts:STRING(255),
      unuse_times:STRING(255),
      finish_use_times:STRING(255),
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
    await queryInterface.dropTable('analyse_funuses');
  }
};
