'use strict';

const Controller = require('egg').Controller;
const moment = require('moment')

const deployLog = {
  log_action: 'string?', // 日志行为
  target: 'string?', // 目标行为
  other_info: 'object?', // 其他信息
};

const getLog = {
  offset:'string?',
  startDate: 'string?',
  endDate:'string?',
  limit:'string?',
  filters:'object?'
};

/**
 * @Controller DeployLog 操作日志
 */

class DeployLogController extends Controller {
  /**
   * @Summary 添加日志
   * @Description 添加日志。
   * @Router post /logdeploy/addLog
   * @Request body deployLog *body resourceInfo
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async addLog() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    console.log(data,'data');
    ctx.validate(deployLog, data);
    ctx.body = await ctx.service.home.projectManager.deployLog.addLog(data);
  }

  /**
   * @Summary 查询日志
   * @Description 查询日志。
   * @Router post /logdeploy/getLog
   * @Request body getDeployLog *body resourceInfo
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async getLog() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(getLog, data);
    const body = {
      limit: ctx.helper.parseInt(ctx.request.body.limit) || 10,
      offset: ctx.helper.parseInt(ctx.request.body.offset) || 0,
      start_date:ctx.request.body.startDate || moment().format('YYYY-MM-DD'),
      end_date:ctx.request.body.endDate|| moment(ctx.request.body.startDate).add(1, 'days').format('YYYY-MM-DD'),
      filters:ctx.request.body.filters
    };
    ctx.body = await ctx.service.home.projectManager.deployLog.getLog(body);
  }


}

module.exports = DeployLogController;
