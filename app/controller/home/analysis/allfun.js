'use strict';

const Controller = require('egg').Controller;

const createRule = {
  offset:'string',
  date: 'string',
  limit:'string'
};

class AnalysisController extends Controller {

  async findAllFun() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(createRule, data);
    const body = {
      limit: ctx.helper.parseInt(ctx.request.body.limit),
      offset: ctx.helper.parseInt(ctx.request.body.offset),
      date:ctx.request.body.date
    };
    ctx.body = await ctx.service.home.analysis.allfun.findAllFunByDate(body);
  }

}

module.exports = AnalysisController;
