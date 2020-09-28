'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE , JSON } = app.Sequelize;

  const Jserr = app.model.define('js_errs', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    err_msg: STRING(4000),
    from_page: STRING(255),
    now_page: STRING(255),
    to_page: STRING(255),
    info: STRING(255),
    machine_id:STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  Jserr.prototype.associate = function() {
    app.model.ServerCount.hasMany(app.model.Post, { as: 'posts' });
  };

  return Jserr;
};
