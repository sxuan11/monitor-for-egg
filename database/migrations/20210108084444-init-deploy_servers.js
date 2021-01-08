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
    await queryInterface.createTable('deploy_servers', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      folder_info:JSON,
      folder_path:STRING(100),
      now_hash:STRING(100),
      git_url:STRING(100),
      git_branch:STRING(100),
      other_info:JSON,
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
    await queryInterface.dropTable('deploy_servers');
  }
};
