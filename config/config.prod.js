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
    mysql: {
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'sxuan',
        // 数据库名
        database: 'shujushouji',
      },
      sequelize : {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'shujushouji',
        password: 'sxuan',
        timezone: '+08:00' // 保存为本地时区
      }
    },

    return {
      ...config,
      ...userConfig,
    };
  };
