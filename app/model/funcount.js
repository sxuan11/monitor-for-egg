'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Funcount = app.model.define('funcount', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    funName: STRING(255),
    machineId: STRING(255),
    useTime: DATE,
    userName: STRING(255),
    stayTime: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  Funcount.prototype.associate = function() {
    app.model.Funcount.hasMany(app.model.Post, { as: 'posts' });
  };

  return Funcount;
};
