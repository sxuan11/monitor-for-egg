'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE ,JSON} = app.Sequelize;

  const Analyse_funuses = app.model.define('analyse_logins', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    funuse_data:JSON,
    fun_average_time:JSON,
    date:DATE,
    counts:STRING(255),
    unuse_times:STRING(255),
    finish_use_times:STRING(255),
    created_at: DATE,
    updated_at: DATE,
    deleted_at:DATE,
  });

  Analyse_funuses.prototype.associate = function() {
    app.model.AnalyseFunuses.hasMany(app.model.Post, { as: 'posts' });
  };

  return Analyse_funuses;
};
