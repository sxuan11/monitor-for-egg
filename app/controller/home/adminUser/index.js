'use strict';

const Controller = require('egg').Controller;

const createRule = {
  user_name: 'string', // 用户名
  password: 'string', // 密码
};

class AdminUserController extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    ctx.validate(createRule, data);
    // 判断该用户是否存在并且密码是否正确
    const isValidUser = await ctx.service.home.adminUser.index.validUser(data.user_name, data.password);
    if (isValidUser) {
      const token = `Bearer ` + app.jwt.sign({ user_name: data.user_name }, app.config.jwt.secret);
      ctx.status = 200;
      ctx.body = { code: 200, message: '登录成功', result:{token,user_name:data.user_name}};
    } else {
      ctx.status = 401;
      ctx.body = { code: 401, message: '登录失败,请确认用户名或密码' };
    }
  }
  // 获取所有用户
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.adminUser.index.getUser();
  }
  // 通过id获取用户
  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.adminUser.index.getUser(ctx.params.id);
  }
  async getMd5Data() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.adminUser.index.getMd5Data(ctx.params.data);
  }
}

module.exports = AdminUserController;