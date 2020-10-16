'use strict';

const Controller = require('egg').Controller;
const moment = require('moment')

const createRule = {
  // offset:'string',
  startDate: 'string',
  endDate:'string',
  // limit:'string'
};

class AnalysisController extends Controller {

  async findAllFunuse() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(createRule, data);
    // let tomorrow = moment(ctx.request.body.startDate).add(1, 'days').format('YYYY-MM-DD');
    // let end_date = ''
    // if(ctx.request.body.endDate){
    //   end_date = ctx.request.body.endDate
    // }else {
    //   end_date = tomorrow
    // }
    const body = {
      // limit: ctx.helper.parseInt(ctx.request.body.limit),
      // offset: ctx.helper.parseInt(ctx.request.body.offset),
      start_date:ctx.request.body.startDate,
      end_date:ctx.request.body.endDate
    };
    ctx.body = await ctx.service.home.analysis.analyseFunuse.findAnalyseFunuse(body);
  }

}

module.exports = AnalysisController;
