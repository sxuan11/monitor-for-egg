'use strict';

const Controller = require('egg').Controller;

const createRule = {
  offset:'string?',
  date: 'string',
};

class AnalysisController extends Controller {

  async findAllUser() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(createRule, data);
    const body = {
      offset: ctx.helper.parseInt(ctx.request.body.offset),
      date:ctx.request.body.date
    };
    ctx.body = await ctx.service.home.analysis.index.findUserByDate(body);
  }

  async findAllFun() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(createRule, data);
    const body = {
      offset: ctx.helper.parseInt(ctx.request.body.offset),
      date:ctx.request.body.date
    };
    ctx.body = await ctx.service.home.analysis.index.findFunByDate(body);
  }

  async findAllHardware() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(createRule, data);
    const body = {
      offset: ctx.helper.parseInt(ctx.request.body.offset),
      date:ctx.request.body.date
    };
    ctx.body = await ctx.service.home.analysis.index.findHardwareByDate(body);
  }

  async findAllServer() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(createRule, data);
    const body = {
      offset: ctx.helper.parseInt(ctx.request.body.offset),
      date:ctx.request.body.date
    };
    ctx.body = await ctx.service.home.analysis.index.findServerByDate(body);
  }

  async findAllJsErr(){
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(createRule, data);
    const body = {
      offset: ctx.helper.parseInt(ctx.request.body.offset),
      date:ctx.request.body.date
    };
    ctx.body = await ctx.service.home.analysis.index.findJsByDate(body);
  }
}

module.exports = AnalysisController;
