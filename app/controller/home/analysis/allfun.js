'use strict';

const Controller = require('egg').Controller;
const moment = require('moment')
const createRule = {
  offset:'string',
  startDate: 'string',
  endDate:'string?',
  limit:'string'
};

/**
 * @Controller Analysis

 */

class AnalysisController extends Controller {

  /**
   * @Summary 根据日期查询
   * @Description 根据日期查询。
   * @Router post /analysis/getAllFunDetail
   * @Request body createResource *body resourceInfo
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async findAllFun() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(createRule, data);
    let tomorrow = moment(ctx.request.body.startDate).add(1, 'days').format('YYYY-MM-DD');
    let end_date = ''
    if(ctx.request.body.endDate){
      end_date = ctx.request.body.endDate
    }else {
      end_date = tomorrow
    }
    const body = {
      limit: ctx.helper.parseInt(ctx.request.body.limit),
      offset: ctx.helper.parseInt(ctx.request.body.offset),
      start_date:ctx.request.body.startDate,
      end_date:end_date
    };
    let result = await ctx.service.home.analysis.allfun.findAllFunByDate(body);
    ctx.body = result
  }

}

module.exports = AnalysisController;
