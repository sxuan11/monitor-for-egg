'use strict';

const Controller = require('egg').Controller;

const createRule = {
  hardware: 'string', // 功能名称
  err_msg: 'dateTime?', // 使用时间
};


class HardwareCountController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.hardwareCount.hardwareCount.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.hardwareCount.hardwareCount.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.validate(createRule, data);
    const user = await ctx.service.hardwareCount.hardwareCount.create(data);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.hardwareCount.hardwareCount.update({ id, updates: body });
  }
}

module.exports = HardwareCountController;
