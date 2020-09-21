'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Hardware_count = app.model.define('hardware_counts', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hardware: STRING(255),
    machine_id: STRING(255),
    err_msg: DATE,
    created_at: DATE,
    updated_at: DATE,
  });

  Hardware_count.prototype.associate = function() {
    app.model.Funcount.hasMany(app.model.Post, { as: 'posts' });
  };

  return Hardware_count;
};
