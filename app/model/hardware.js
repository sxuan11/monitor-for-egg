'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Hardware = app.model.define('hardware_counts', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hardware: STRING(255),
    machine_id: STRING(255),
    err_msg: STRING(255),
    created_at: DATE,
    updated_at: DATE,
    deleted_at:DATE,
  });

  Hardware.prototype.associate = function() {
    app.model.Funcount.hasMany(app.model.Post, { as: 'posts' });
  };

  return Hardware;
};
