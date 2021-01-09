'use strict';

const Controller = require('egg').Controller;

const firstDeploy = {
  folder_path: 'string', // 文件夹路径
  git_url: 'string', // giturl，请使用http，带上账号密码
  git_branch: 'string', // git分支
  git_name: 'string', // git仓库名称
};

const updateproject = {
  id:'string',
  to_hash:'string'//更新的目标hash值
}

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
   * @Request body createDeploy *body resourceInfo
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

  /**
   * @Summary 检查该项目当前的提交情况
   * @Description 检查该项目当前的提交情况。
   * @Router get /deployserver/checkGitLog
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async checkGitLog() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.home.projectManager.deployServer.checkGitLog();
  }

  /**
   * @Summary 更新到指定版本
   * @Description 更新到指定版本。
   * @Router post /deployserver/updateproject
   * @Request body updateProject *body resourceInfo
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async updateproject() {
    const ctx = this.ctx;
    const data = ctx.request.body
    ctx.validate(updateproject, data);
    ctx.body = await ctx.service.home.projectManager.deployServer.updateproject(ctx.request.body);
  }
}

module.exports = DeployServerController;
