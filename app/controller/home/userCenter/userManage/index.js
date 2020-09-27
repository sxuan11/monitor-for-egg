'use strict';

const Controller = require('egg').Controller;

const createRule = {
  password:'string',
  email: 'string',
  name: 'string',
  role: 'array',
  role_id: 'string',
  user_name: 'string',
  telephone: 'string?',
};

class UserManageController extends Controller {

  async AddUser() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(createRule, data);
    let info  = await ctx.service.home.userCenter.userManage.index.addUser(data);
    console.log(info,'info');
    if(info === 'success'){
      ctx.status = 200;
      ctx.body = { code: 200, message: '创建成功', result:''};
    }else if(info === 1){
      ctx.status = 200;
      ctx.body = { code: 400, message: '该用户已存在', result:''};
    }

    // ctx.body = await ctx.service.home.userCenter.userManage.index.addUser(data);
  }

}

module.exports = UserManageController;
