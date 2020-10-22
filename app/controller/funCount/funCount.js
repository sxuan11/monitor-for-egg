'use strict';

const Controller = require('egg').Controller;

const createRule = {
  fun_name: 'string', // 功能名称
  // machineId: 'string', // 机器id
  use_time: 'dateTime?', // 使用时间
  is_effect : 'string', //功能是否有效，0是无效，1是有效
  stay_time: 'string?', // 功能停留时间
};


/**  （ 注释必写，swagger-doc是根据这段注释来生成接口详细信息的 ）。
 * @summary 根据ID查询信息。
 * @Controller
 * @description 根据ID查询信息。
 * @router get /funCount/index （ get 表示设置请求为 get 请求，最后的 selectById 对应下面的 selectById 方法 ）。
 * @request query integer Id 需要去查新的ID。（ get 对应 query 请求，请求值设定为 integer 纯数字类型，ID 为请求的字段，注意大小写，和下面的方法要一一对应，不然会报错 ）。
 * @response 200 JsonBody 返回结果。（ 对应 contract 里面的验证属性，下面会提到 。）
 */
class FunCountController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.funCount.funCount.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.funCount.funCount.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.validate(createRule, data);
    const user = await ctx.service.funCount.funCount.create(data);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.funCount.funCount.update({ id, updates: body });
  }
}

module.exports = FunCountController;
