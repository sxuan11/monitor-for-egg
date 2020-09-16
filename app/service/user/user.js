'use strict';

const Service = require('egg').Service;

class User extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.User.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(idcard) {
    // const user = await this.ctx.model.User.findByPk(id);
    const user = await this.ctx.model.User.findOne({ where: {idcard} })
    if (!user) {
      this.ctx.throw(404, '未查询到该用户');
    }
    return user;
  }

  async create(user) {
    console.log(user,'user');
    const {app} = this
    const findUser = await this.ctx.model.User.findOne({ where: {idcard:user.idcard} })
    let newUser = ''
    const token = app.jwt.sign({name: user.name,}, app.config.jwt.secret);
    newUser = { token,terminalid:this.ctx.header.terminalid ,hisuserid:this.ctx.header.hisuserid,...user }
    if(findUser){
      return findUser.update(newUser);
    }else{
      return this.ctx.model.User.create(newUser);
    }
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

}

module.exports = User;
