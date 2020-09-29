'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    idcard: STRING(30),
    token: STRING(255),
    login_mode : STRING(255),
    terminalid:STRING(255),
    hisuserid:STRING(255),
    created_at: DATE,
    updated_at: DATE,
    deleted_at:DATE,
  });

  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Post, { as: 'posts' });
  };

  return User;
};
