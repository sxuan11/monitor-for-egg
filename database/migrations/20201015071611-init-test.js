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
    await queryInterface.createTable('test', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      data:JSON,
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
    await queryInterface.dropTable('test');
  }
};
