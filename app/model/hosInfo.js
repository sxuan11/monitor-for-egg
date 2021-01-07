'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const HosInfo = app.model.define('HosInfo', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hos_name:STRING(100),
    hos_url:STRING(255),
    add_user:STRING(40),
    created_at: DATE,
    updated_at: DATE,
    deleted_at:DATE,
  });

  HosInfo.prototype.associate = function() {
    app.model.HosInfo.hasMany(app.model.Post, { as: 'posts' });
  };

  return HosInfo;
};
