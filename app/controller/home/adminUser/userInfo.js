'use strict';

const Controller = require('egg').Controller;

const createRule = {
  // hardware: 'string', // 功能名称
  // err_msg: 'string?', // 使用时间
};


class AdminUserinfoController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.home.adminUser.userInfo.list(query);

  }

  async show() {
    const ctx = this.ctx;
    const user = await ctx.service.home.adminUser.userInfo.find(ctx.request.body.user_name);
    if(user) {
      ctx.status = 200;
      ctx.body = { code: 200, message: '登录成功', result:user};
    } else {
      ctx.status = 401;
      ctx.body = { code: 401, message: '登录失败,请确认用户名或密码' };
    }
  }

  async create() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.validate(createRule, data);
    const user = await ctx.service.home.adminUser.userInfo.create(data);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.home.adminUser.userInfo.update({ id, updates: body });
  }
}

module.exports = AdminUserinfoController;
