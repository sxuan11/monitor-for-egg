'use strict';

const Service = require('egg').Service;

class AdminUserinfo extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.userinfo.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(user_name) {
    // const user = await this.ctx.model.User.findByPk(id);
    const user = await this.ctx.model.Userinfo.findOne({ where: { user_name } });
    if (!user) {
      this.ctx.throw(401, '未查询到该用户或该用户信息已过期');
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
    return this.ctx.model.userinfo.create(newInfo);

  }

  async update({ id, updates }) {
    const user = await this.ctx.model.userinfo.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

}

module.exports = AdminUserinfo;
