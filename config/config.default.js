/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    middleware: [ 'gzip'],
    // 配置 gzip 中间件的配置
    gzip: {
      threshold: 1024, // 小于 1k 的响应体不压缩
    },
    bodyParser: {
      jsonLimit: '1mb',
      formLimit: '1mb',
    },
    // mysql: {
    //   client: {
    //     // host
    //     host: '127.0.0.1',
    //     // 端口号
    //     port: '3306',
    //     // 用户名
    //     user: 'root',
    //     // 密码
    //     password: 'sxuan',
    //     // 数据库名
    //     database: 'shujishouji',
    //   },
    // },
    // onerror: {
    //   html(err, ctx) {
    //     // html hander
    //     ctx.body = '<h3>error</h3>';
    //     ctx.status = 500;
    //   },
    //   json(err, ctx) {
    //     // json hander
    //     ctx.body = { message: 'error' };
    //     ctx.status = 500;
    //   },
    // },
    // sequelize : {
    //   dialect: 'mysql',
    //   host: '127.0.0.1',
    //   port: 3306,
    //   database: 'shujushouji',
    //   password: 'sxuan',
    //   timezone: '+08:00' // 保存为本地时区
    // }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599446987929_1858';

  // add your middleware config here
  // config.middleware = [];
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [ '*' ],
  };

  config.jwt = {
    secret: 'sxuan',
  };

  config.cors = {
    origin: '*',
    allowHeaders : '*',
    exposeHeaders: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // mysql配置
  // const mysql = {
  //   client: {
  //     // host
  //     host: '127.0.0.1',
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: 'root',
  //     // 密码
  //     password: 'root',
  //     // 数据库名
  //     database: 'shujishouji',
  //   },
  // }

  return {
    ...config,
    ...userConfig,
  };
};
