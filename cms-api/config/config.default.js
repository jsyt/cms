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
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564928170670_5185';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    cors: {
      credentials: true,
      // origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
    JWT_SECRET: '123465'
  };

  config.security = {
    csrf: false,
    domainWhiteList: ['http://localhost:8000', 'http://192.168.1.2:8000/', 'http://127.0.0.1:8000/']
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // host: '122.152.196.178',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'huyuetian',
      // 数据库名
      database: 'cms',
    }
  }
  return {
    ...config,
    ...userConfig,
  };
};