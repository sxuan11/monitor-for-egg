'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, jwt } = app;
  const gzip = app.middleware.gzip({ threshold: 1024 });
  router.post('/user/login', controller.login.login.login);
  router.post('/user', jwt, controller.login.login.index);
  // router.resources('users', '/users', controller.user.userinfo);
  app.resources('users', '/users', app.controller.user.user);
  app.resources('funCount', '/funCount', app.controller.funCount.funCount);
  // router.resources('login', '/user/login', controller.login.login.login);
};
