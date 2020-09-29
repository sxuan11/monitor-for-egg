'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;
const crypto = require('crypto');
const fs = require("fs");
const path = require("path");
const NodeRSA = require('node-rsa');


function encrypt(data) {
  const publicKey = fs.readFileSync(path.join(__dirname, "../../../../../config/rsa_public_key.pem"));
  const nodersa = new NodeRSA(publicKey);
  nodersa.setOptions({ encryptionScheme: 'pkcs1' });
  const encrypted = nodersa.encrypt(data, 'base64');
  return encrypted;
}

function decrypt(data) {
  const privateKey = fs.readFileSync(path.join(__dirname, "../../../../../config/rsa_private.pem"));
  const rsa = new NodeRSA(privateKey, 'pkcs8-private-pem', {encryptionScheme: 'pkcs1'})
  const decrypted = rsa.decrypt(data, 'utf8');
  return decrypted;
}

class UserManage extends Service {

  async addUser(data) {
    const { ctx } = this
    data.creator_id = ctx.state.user.user_name
    data.create_time = (moment.now()).toString()
    data.status = '1'
    data.merchant_code = 'TLif2btpzg079h15bk'
    data.deleted = '0'
    let roleInfo = data.role
    let password = encrypt(data.password)
    delete (data["role","password"]);
    let role = {
      id:data.role_id,
      name:data.name,
      status:1,
      deleted:0,
      describe:'',
      creatorId:ctx.state.user.user_name,
      createTime: moment.now(),
    }
    let permissions = []
    for(let item of roleInfo){
      let obj = {
          "roleId":data.role_id,
          "actions":"[{'action':'add','defaultCheck':false,'describe':'新增'},{'action':'query','defaultCheck':false,'describe':'查询'},{'action':'get','defaultCheck':false,'describe':'详情'},{'action':'update','defaultCheck':false,'describe':'修改'},{'action':'delete','defaultCheck':false,'describe':'删除'}]",
          "actionList":null,
          "dataAccess":null,
          "permissionId":item,
          "permissionName":item,
          "actionEntitySet":[{
            "action": "add",
            "describe": "新增",
            "defaultCheck": false
          }, {
            "action": "query",
            "describe": "查询",
            "defaultCheck": false
          }, {
            "action": "get",
            "describe": "详情",
            "defaultCheck": false
          }, {
            "action": "update",
            "describe": "修改",
            "defaultCheck": false
          }, {
            "action": "delete",
            "describe": "删除",
            "defaultCheck": false
          }]
        }
        permissions.push(obj)
    }
    role.permissions = permissions
    data.role = role
    let AdminUser = {
      role:data.role_id,
      user_name:data.user_name,
      password:password,
      email:data.email,
      phone:data.telephone||'',
    }

    console.log(ctx.model.Userinfo,'ctx.model.adminUsers');
    const pwdUser =  ctx.model.AdminUsers.findOne({ where: {user_name:data.user_name}}).then( async (value)=>{
      if(value){
        return 1
      }else {
        await ctx.model.AdminUsers.create(AdminUser)
        await ctx.model.Userinfo.create(data)
        return 'success'
      }
    })
    return pwdUser

  }

  async getAllUser({ offset = 0, limit = 10000 }){
    const { ctx } = this
    return await ctx.model.Userinfo.findAndCountAll({offset,limit,})
  }

  async deleteUser(data){
    console.log(data,'data');
    const { ctx } = this
    if(data.user_name === 'sxuan'){
      return {
        code:400,
        message:'马老板你不可以删除我哦'
      }
    }
    const user1 = await ctx.model.Userinfo.findOne({where:{user_name:data.user_name}})
    const user2 = await ctx.model.AdminUsers.findOne({where:{user_name:data.user_name}})
    if(user1 && user2){
      user1.destroy()
      user2.destroy()
      return {
        code:200,
        message:'删除成功'
      }
    }else {
      return {
        code:200,
        message:'什么，删除不到？好像没有这个人'
      }
    }
  }

}

module.exports = UserManage;
