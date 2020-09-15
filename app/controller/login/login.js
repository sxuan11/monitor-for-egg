'use strict';

const Controller = require('egg').Controller;

const createRule = {
  userName: 'string',
  // HisUserId: 'string',
  phone:'string'
};

class UserController extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    ctx.validate(createRule, data);
    const info = await ctx.service.login.index.find(ctx.request.body);
    console.log(info.newUser,'info');

    // ctx.status = 201;
    // ctx.body = {
    //   token:`Bearer ${token}`,
    //   userName:data.userName
    // };
    ctx.body =info.newUser;
  }
  // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
  // 特别注意：token不能直接发送，要在前面加上Bearer字符串和一个空格
  async index() {
    const { ctx } = this;
    console.log(ctx.state.user);
    ctx.body = { code: 201, msg: '验证成功' };
  }
}

module.exports = UserController;