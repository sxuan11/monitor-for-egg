'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE ,JSON} = app.Sequelize;

  const Analyse_logins = app.model.define('analyse_logins', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date:Date,
    counts:STRING(255),
    login_data:JSON,
    created_at: DATE,
    updated_at: DATE,
    deleted_at:DATE,
  });

  Analyse_logins.prototype.associate = function() {
    app.model.Analyse_logins.hasMany(app.model.Post, { as: 'posts' });
  };

  return Analyse_logins;
};
