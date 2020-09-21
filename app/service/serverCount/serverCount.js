'use strict';

const Service = require('egg').Service;

class ServerCount extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.ServerCount.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(idcard) {
    // const user = await this.ctx.model.User.findByPk(id);
    const user = await this.ctx.model.ServerCount.findOne({ where: { idcard } });
    if (!user) {
      this.ctx.throw(404, '未查询记录');
    }
    return user;
  }

  async create(info) {
    const { app , ctx  } = this;
    let machine_id
    if(this.ctx.header.terminalid){
      machine_id = this.ctx.header.terminalid
    }else{
      machine_id = this.ctx.header.hisuserid
    }
    let newInfo = {
      machine_id: machine_id || '999',
      ...info
    }
    return this.ctx.model.ServerCount.create(newInfo);
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.ServerCount.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

}

module.exports = ServerCount;
