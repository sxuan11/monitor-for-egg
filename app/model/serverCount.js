'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE , JSON } = app.Sequelize;

  const ServerCount = app.model.define('server_counts', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    res_code: STRING(255),
    res_message: STRING(255),
    res_data: JSON,
    res:JSON,
    req: JSON,
    machine_id:STRING(255),
    use_time: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  ServerCount.prototype.associate = function() {
    app.model.ServerCount.hasMany(app.model.Post, { as: 'posts' });
  };

  return ServerCount;
};
