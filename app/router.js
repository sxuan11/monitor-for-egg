'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, jwt } = app;
  // const gzip = app.middleware.gzip({ threshold: 1024 });
  // router.post('/user/login', controller.login.login.login);
  // router.post('/user', jwt, controller.login.login.index);
  // router.resources('users', '/users', controller.user.userinfo);
  app.resources('users', '/users', controller.user.user);
  app.resources('funCount', '/funCount',jwt, controller.funCount.funCount);
  app.resources('serverCount', '/serverCount',controller.serverCount.serverCount);
  app.resources('hardwareCount', '/hardwareCount', controller.hardwareCount.hardwareCount);
  app.resources('jsErr', '/jsErr', controller.jsErr.jsErr);
  // router.resources('login', '/user/login', controller.login.login.login);

  router.post('/adminUser/login', controller.home.adminUser.index.login);
  router.get('/adminUser', controller.home.adminUser.index.index);
  router.get('/adminUser/:id', jwt, controller.home.adminUser.index.show);
  router.get('/adminUser/getMd5/:data', controller.home.adminUser.index.getMd5Data);
  router.get('/rsa', controller.home.adminUser.rsa.getRsa);
  router.post('/adminUserInfo',jwt, controller.home.adminUser.userInfo.show);

  //analysis
  router.post('/analysis/allUser', jwt , controller.home.analysis.index.findAllUser);
  router.post('/analysis/allFun' , jwt , controller.home.analysis.index.findAllFun);
  router.post('/analysis/allHardware' , jwt , controller.home.analysis.index.findAllHardware);
  router.post('/analysis/allServer'  , jwt , controller.home.analysis.index.findAllServer);
  router.post('/analysis/allJserr'  , jwt , controller.home.analysis.index.findAllJsErr);

  router.post('/analysis/getAllUserDetail'  , jwt , controller.home.analysis.alluser.findAllUser);
  router.post('/analysis/getAllFunDetail'  , jwt , controller.home.analysis.allfun.findAllFun);
  router.post('/analysis/getAllServerDetail'  , jwt , controller.home.analysis.allserver.findAllServer);
  router.post('/analysis/getAllHardwareDetail'  , jwt , controller.home.analysis.allhardware.findAllHardware);
  router.post('/analysis/getAllJsErrDetail'  , jwt , controller.home.analysis.alljserr.findAllJsErr);

  router.post('/analysis/getAnalyseLogin'  , jwt , controller.home.analysis.analyseLogin.findAllLogin);
  router.post('/analysis/getAnalyseFunuse'  , jwt , controller.home.analysis.analyseFunuse.findAllFunuse);

  //account
  router.post('/usercenter/adduser'  , jwt , controller.home.userCenter.userManage.index.AddUser);
  router.post('/usercenter/getalluser'  , jwt , controller.home.userCenter.userManage.index.GetAllUser)
  router.post('/usercenter/deleteuser'  , jwt , controller.home.userCenter.userManage.index.DeleteUser)
  router.post('/usercenter/updateuser'  , jwt , controller.home.userCenter.userManage.index.UpdateUser)

  //ProjectManager
  app.resources('projectManager', '/projectManager/',jwt, controller.home.projectManager.index);
  router.post('/deployserver/firstDeploy'  , jwt , controller.home.projectManager.deployServer.firstDeploy)
  router.get('/deployserver/envCheck'  , jwt , controller.home.projectManager.deployServer.envCheck)
};
