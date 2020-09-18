'use strict';

const Service = require('egg').Service;

class FunCount extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Funcount.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(idcard) {
    // const user = await this.ctx.model.User.findByPk(id);
    const user = await this.ctx.model.Funcount.findOne({ where: { idcard } });
    if (!user) {
      this.ctx.throw(404, '未查询记录');
    }
    return user;
  }

  async create(info) {
    const { app , ctx  } = this;
    // const findUser = await this.ctx.model.User.findOne({ where: { idcard: user.idcard } });
    // let newUser = '';
    // const token = app.jwt.sign({ name: user.name }, app.config.jwt.secret);
    // newUser = { token, ...user };
    // if (findUser) {
    //   return findUser.update(newUser);
    // }
    console.log(ctx.state.user,' ctx.state.user');
    let machine_id
    if(this.ctx.header.terminalid){
      machine_id = this.ctx.header.terminalid
    }else{
      machine_id = this.ctx.header.hisuserid
    }
    let newInfo = {
      machine_id:'999',
      user_name : ctx.state.user.name,
      ...info
    }
    return this.ctx.model.Funcount.create(newInfo);

  }

  async update({ id, updates }) {
    const user = await this.ctx.model.Funcount.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

}

module.exports = FunCount;
