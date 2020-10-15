'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE ,JSON} = app.Sequelize;

  const Test = app.model.define('tests', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data:JSON,
    created_at: DATE,
    updated_at: DATE,
    deleted_at:DATE,
  });

  Test.prototype.associate = function() {
    app.model.Test.hasMany(app.model.Post, { as: 'posts' });
  };

  return Test;
};
