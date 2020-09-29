'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Funcount = app.model.define('funcount', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fun_name: STRING(255),
    machine_id: STRING(255),
    use_time: DATE,
    user_name: STRING(255),
    stay_time: STRING(255),
    is_effect: STRING(255),
    created_at: DATE,
    updated_at: DATE,
    deleted_at:DATE,
  });

  Funcount.prototype.associate = function() {
    app.model.Funcount.hasMany(app.model.Post, { as: 'posts' });
  };

  return Funcount;
};
