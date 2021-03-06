'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING ,JSON } = Sequelize;
    await queryInterface.createTable('admin_users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      username:STRING(255),
      password: STRING(255),
      status: STRING(255),
      telephone: STRING(255),
      last_login_ip: STRING(255),
      creator_id: STRING(255),
      merchant_code: STRING(255),
      deleted: STRING(255),
      role_id: STRING(255),
      role: JSON,
      created_at: DATE,
      create_time: DATE,
      last_login_time: DATE,
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
