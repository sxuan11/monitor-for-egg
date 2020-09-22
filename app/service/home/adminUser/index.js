'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
const fs = require("fs");
const path = require("path");

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class AdminUserService extends Service {
  // 查询user表，验证密码和用户名
  async validUser(user_name, password) {
    let privateKey = fs.readFileSync(path.join(__dirname, "/rsa_private.pem"));
    // const data = await this.getUser();
    let result = crypto.privateDecrypt(privateKey, password);
    console.log(result);
    const userpwd = await  ctx.model.AdminUsers.findOne(user_name)
    console.log(userpwd);
    // const pwd = crypto.createHash('md5').update(password).digest('hex');
    // for (const item of data) {
    //   if (item.user_name === user_name && item.password === pwd) return true;
    // }
    return false;
  }
  // 获取用户，不传id则查询所有
  async getUser(id) {
    const { ctx } = this;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };

    if (id) {
      return await ctx.model.AdminUsers.findByPk(toInt(id));
    }
    return await ctx.model.AdminUsers.findAll(query);
  }
  // 专门对数据进行md5加密的方法，输入明文返回密文
  getMd5Data(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  }
}
module.exports = AdminUserService;