'use strict';

const Controller = require('egg').Controller;

const createRule = {
  res_code: 'string?', // 响应状态
  res_message: 'string?', // 响应消息
  res_data: 'string?', // 响应数据
  req : 'string', //请求数据
  use_time: 'string?', // 花费请求的时间
};


class ServerCountController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.ServerCount.ServerCount.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.ServerCount.ServerCount.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    console.log(data,'data');
    ctx.validate(createRule, data);
    const user = await ctx.service.serverCount.serverCount.create(data);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.ServerCount.ServerCount.update({ id, updates: body });
  }
}

module.exports = ServerCountController;
