'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
const fs = require("fs");
const path = require("path");
const NodeRSA = require('node-rsa');
const moment = require('moment')

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

function encrypt(data) {
  const publicKey = fs.readFileSync(path.join(__dirname, "../../../../config/rsa_public_key.pem"));
  const nodersa = new NodeRSA(publicKey);
// nodersa.setOptions({ encryptionScheme: 'pkcs1' });
  const encrypted = nodersa.encrypt(data, 'base64');
  return encrypted;
}

function decrypt(data) {
  const privateKey = fs.readFileSync(path.join(__dirname, "../../../../config/rsa_private.pem"));
  const rsa = new NodeRSA(privateKey, 'pkcs8-private-pem', {encryptionScheme: 'pkcs1'})
  const decrypted = rsa.decrypt(data, 'utf8');
  return decrypted;
}


class AdminUserService extends Service {
  // 查询user表，验证密码和用户名
  async validUser(user_name, password) {
    const {ctx} = this;
    let result = decrypt(password)
    const pwdUser = await ctx.model.AdminUsers.findOne({where: {user_name}})
    if (pwdUser) {
      let result2 = decrypt(pwdUser.password)
      if (result === result2) {
        const updateUser = await ctx.model.Userinfo.findOne({where: {user_name}})
        let updateInfo = {
          last_login_ip: this.ctx.request.ip,
          last_login_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        pwdUser.update(updateInfo)
        updateUser.update(updateInfo)
        return true
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // 获取用户，不传id则查询所有
  async getUser(id) {
    const {ctx} = this;
    const query = {limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset)};

    if (id) {
      return await ctx.model.AdminUsers.findByPk(toInt(id));
    }
    return await ctx.model.AdminUsers.findAll(query);
  }

  // 专门对数据进行md5加密的方法，输入明文返回密文
  getMd5Data(data) {
    let result1 = crypto.createHash('md5').update(data).digest('hex');
    return crypto.createHash('md5').update(result1).digest('hex');
  }
}

module.exports = AdminUserService;