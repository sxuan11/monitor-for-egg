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
    await queryInterface.createTable('funcount', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      fun_name: STRING(255),
      machine_id: STRING(255),
      use_time: DATE,
      user_name: STRING(255),
      stay_time: STRING(255),
      is_effect: STRING(255),
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
    await queryInterface.dropTable('funcount');
  }
};
