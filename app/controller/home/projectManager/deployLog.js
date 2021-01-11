'use strict';

const Controller = require('egg').Controller;

const deployLog = {
  log_action: 'string?', // 日志行为
  target: 'string?', // 目标行为
  other_info: 'object?', // 其他信息
};

/**
 * @Controller DeployLog 操作日志
 */

class DeployLogController extends Controller {
  /**
   * @Summary 添加日志
   * @Description 添加日志。
   * @Router post /logdeploy/addLog
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
   * @Router get /logdeploy/getLog
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async getLog() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.home.projectManager.deployLog.getLog();
  }


}

module.exports = DeployLogController;
