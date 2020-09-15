'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const UserInfo = app.model.define('userinfo', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    token: STRING(30),
    phone: STRING(30),
    lastLogin: STRING(30),
  });

  return UserInfo;
};