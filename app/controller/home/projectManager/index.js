'use strict';

const Controller = require('egg').Controller;

const createRule = {
  hos_name: 'string', // 医院名称
  hos_url: 'string', // 医院服务url
};

const createRule2 = {
  hos_name: 'string?', // 医院名称
  hos_url: 'string?', // 医院服务url
};


/**
 * @Controller ProjectManager 卫生院管理
 */

class ProjectManagerController extends Controller {
  /**
   * @Summary 获取所有的卫生院配置
   * @Description 获取所有的卫生院配置。
   * @Router get /projectManager
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.home.projectManager.index.list(query);
  }

  /**
   * @Summary 获取单个卫生院配置
   * @Description 获取单个卫生院配置
   * @Router get /projectManager/:id
   * @Request query queryHos *query queryHos
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.home.projectManager.index.find(ctx.helper.parseInt(ctx.params.id));
  }

  /**
   * @Summary 新增卫生院
   * @Description 新增卫生院。
   * @Router POST /projectManager
   * @Request body createHos *body resourceInfo
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async create() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.validate(createRule, data);
    const user = await ctx.service.home.projectManager.index.create(data);
    ctx.status = 201;
    ctx.body = user;
  }

  /**
   * @Summary 更新卫生院配置
   * @Description 更新卫生院配置，需要传入对应id。
   * @Router put /projectManager/:id
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.validate(createRule2, body);
    ctx.body = await ctx.service.home.projectManager.index.update({id, updates: body});
  }

  /**
   * @Summary 删除卫生院配置
   * @Description 删除卫生院配置，需要传入对应id
   * @Router DELETE /projectManager/:id
   * @Request header string Authorization
   * @Response 200 baseResponse
   * @returns {Promise<void>}
   */
  async destroy() {
    const ctx = this.ctx;
    let isOk = await ctx.service.home.projectManager.index.destroy(ctx.helper.parseInt(ctx.params.id));
    if(isOk){
      ctx.body = {
        code:200,
        data:true,
        message:'删除成功'
      }
    }else{
      ctx.body = {
        code:400,
        message:'未发现该记录'
      }
    }
  }
}

module.exports = ProjectManagerController;
