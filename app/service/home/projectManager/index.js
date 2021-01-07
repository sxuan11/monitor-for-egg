'use strict';

const Service = require('egg').Service;

class ProjectManager extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.HosInfo.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  //查找一个
  async find(id) {
    const user = await this.ctx.model.HosInfo.findByPk(id);
    // const user = await this.ctx.model.HosInfo.findOne({ where: { id } });
    if (!user) {
      this.ctx.throw(404, '未查询记录');
    }
    return user;
  }

  //创建
  async create(info) {
    const { app , ctx  } = this;
    let newInfo = {
      add_user : ctx.state.user.user_name,
      ...info
    }
    return this.ctx.model.HosInfo.create(newInfo);
  }

  //更新
  async update({ id, updates }) {
    const user = await this.ctx.model.HosInfo.findByPk(id);
    if (!user) {
      this.ctx.throw(400, '未发现该记录');
    }
    return user.update(updates);
  }

  //删除
  async destroy(id) {
    const user = await this.ctx.model.HosInfo.findByPk(id);
    if (!user) {
      return false;
    }
    return user.destroy(id);
  }

}

module.exports = ProjectManager;
