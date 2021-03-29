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
    // middleware: [ 'gzip'],
    // 配置 gzip 中间件的配置
    // gzip: {
    //   threshold: 1024, // 小于 1k 的响应体不压缩
    // },
    proxy : true,
    // maxIpsCount:1,
    ipHeaders : 'X-Real-Ip, X-Forwarded-For',
    swaggerdoc : {
      dirScanner: './app/controller',
      apiInfo: {
        title: 'egg-swagger',
        description: 'swagger-ui for egg',
        version: '1.0.0',
      },
      basePath: '/',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        // apikey: {
        //   type: 'apiKey',
        //   name: 'clientkey',
        //   in: 'header',
        // },
        // oauth2: {
        //   type: 'oauth2',
        //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
        //   flow: 'password',
        //   scopes: {
        //     'write:access_token': 'write access_token',
        //     'read:access_token': 'read access_token',
        //   },
        // },
      },
      enableSecurity: false,
      // enableValidate: true,
      routerMap: true,
      enable: true,
    },
    // io : {
    //   init: { }, // passed to engine.io
    //   namespace: {
    //     '/': {
    //       connectionMiddleware: [],
    //       packetMiddleware: [],
    //     },
    //     '/example': {
    //       connectionMiddleware: [],
    //       packetMiddleware: [],
    //     },
    //   },
    // },
    bodyParser: {
      jsonLimit: '1mb',
      formLimit: '1mb',
    },
    logger :{
      dir: `./log/${process.env.NODE_ENV}`,
    },
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
    },
    sequelize : {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'shujushouji',
      password: 'sxuan',
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
    }
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
