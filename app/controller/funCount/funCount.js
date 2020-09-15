'use strict';

const Controller = require('egg').Controller;

const createRule = {
  funName: 'string', //功能名称
  machineId:'string', //机器id
  useTime:'dateTime?', //使用时间
  userName:'string?', //用户名
  stayTime:'string?', //功能停留时间
};


class FunCountController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.user.user.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.user.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.validate(createRule, data);
    const user = await ctx.service.user.user.create(data);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.user.update({ id, updates: body });
  }
}

module.exports = FunCountController;
