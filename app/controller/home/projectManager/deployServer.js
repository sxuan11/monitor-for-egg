'use strict';

const Controller = require('egg').Controller;

const firstDeploy = {
  folder_path: 'string', // 文件夹路径
  git_url: 'string', // giturl，请使用http，带上账号密码
  git_branch: 'string', // git分支
  git_name: 'string', // git仓库名称
};

/**
 * @Controller DeployServer 卫生院部署
 */

class DeployServerController extends Controller {
  /**
   * @Summary 环境检查
   * @Description 检查是否部署过。
   * @Router get /deployserver/envCheck
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async envCheck() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.home.projectManager.deployServer.envCheck();
  }

  /**
   * @Summary 第一次部署
   * @Description 第一次部署。
   * @Router post /deployserver/firstDeploy
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async firstDeploy() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(firstDeploy, data);
    ctx.body = await ctx.service.home.projectManager.deployServer.firstDeploy(ctx.request.body);
  }
}

module.exports = DeployServerController;
