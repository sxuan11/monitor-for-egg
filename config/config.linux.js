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
  sequelize : {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'shujushouji',
    password: 'Sxuan123@sxuan',
    timezone: '+08:00' // 保存为本地时区
  },
  alinode : {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    server: 'wss://agentserver.node.aliyun.com:8080',
    appid: '86225',
    secret: '037dded8080d7648321abc143af9dc6475b10fe8',
  }
};
