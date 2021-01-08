'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE ,JSON } = app.Sequelize;

  const HosInfo = app.model.define('DeployServers', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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

  HosInfo.prototype.associate = function() {
    app.model.HosInfo.hasMany(app.model.Post, { as: 'posts' });
  };

  return HosInfo;
};
