'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE ,JSON } = app.Sequelize;

  const HosInfo = app.model.define('DeployLogs', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    other_info:JSON,
    user:STRING(40),
    target:STRING(255),
    log_action:STRING(255),
    created_at: DATE,
    updated_at: DATE,
    deleted_at:DATE,
  });

  HosInfo.prototype.associate = function() {
    app.model.HosInfo.hasMany(app.model.Post, { as: 'posts' });
  };

  return HosInfo;
};
