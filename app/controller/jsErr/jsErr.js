'use strict';

const Controller = require('egg').Controller;

const createRule = {
  err_msg: 'string?', // 错误信息
  from_page: 'string?', // 从哪个页面来
  now_page: 'string?', // 哪个页面报错
  to_page: 'string?', // 去往哪个页面
  info: 'string?', // 信息,包含生命周期指令等等
};


class JsErrController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.jsErr.jsErr.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.jsErr.jsErr.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.validate(createRule, data);
    const user = await ctx.service.jsErr.jsErr.create(data);
    ctx.status = 201;
    ctx.body = user;
  }

  // async update() {
  //   const ctx = this.ctx;
  //   const id = ctx.helper.parseInt(ctx.params.id);
  //   const body = ctx.request.body;
  //   ctx.body = await ctx.service.jsErr.jsErr.update({ id, updates: body });
  // }
}

module.exports = JsErrController;
