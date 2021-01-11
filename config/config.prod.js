/* eslint valid-jsdoc: "off" */

'use strict';
module.exports = {
  keys: '_1599446987929_1858',
  mysql: {
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'monitor',
      // 密码
      password: 'monitor',
      // 数据库名
      database: 'monitor',
    },
  },
  sequelize : {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'monitor',
    username: 'monitor',
    password: 'monitor',
    timezone: '+08:00' ,// 保存为本地时区
    define: {
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      // 所有驼峰命名格式化
      underscored: true
    },
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    }
  }
};
