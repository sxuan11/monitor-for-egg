'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE , JSON } = app.Sequelize;

  const UserInfos = app.model.define('userinfos', {
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

  return UserInfos;
};