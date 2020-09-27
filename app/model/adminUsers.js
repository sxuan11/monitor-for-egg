'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const AdminUsers = app.model.define('admin_users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: STRING(255),
    user_name:{ type: STRING(255), primaryKey: true},
    password: STRING(255),
    email: STRING(255),
    phone: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  AdminUsers.prototype.associate = function() {
    app.model.AdminUsers.hasMany(app.model.Post, { as: 'posts' });
  };

  return AdminUsers;
};
