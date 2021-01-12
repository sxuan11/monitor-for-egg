/* eslint valid-jsdoc: "off" */

'use strict';
module.exports = {
  keys: '_1599446987929_1858',
  mysql: {
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'Sxuan123@sxuan',
      // 数据库名
      database: 'shujushouji',
    },
  },
  cluster:{
    listen:{
      port:7071,
      hostname:'0.0.0.0',
    }
  },
  sequelize : {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'shujushouji',
    username: 'root',
    password: 'Sxuan123@sxuan',
    timezone: '+08:00', // 保存为本地时区
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

  },
  alinode : {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    server: 'wss://agentserver.node.aliyun.com:8080',
    appid: '86225',
    secret: '037dded8080d7648321abc143af9dc6475b10fe8',
  }
};
