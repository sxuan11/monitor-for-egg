'use strict';

const Service = require('egg').Service;

class ServerCount extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Hardware.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(idcard) {
    // const user = await this.ctx.model.User.findByPk(id);
    const user = await this.ctx.model.Hardware.findOne({ where: { idcard } });
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
    const err = ['打印机未连接或未上电','打印头打开','切刀未复位','卡片无效','商户号未在银行登记','查发卡方','CVN验证失败','不允许进行交易','获取医保个账支付数据异常','开启摄像头失败，请重试','黑标错误','密码键盘激活失败','打印机和调用库不匹配']
    for(let item of err){
      if(info.err_msg.includes(item)){
        const res = await this.ctx.curl(`https://oapi.dingtalk.com/robot/send?access_token=88e9f417717e0d18f5dfe479d95a6ee2118d01c17013b4539b7e9f090f77bd48&timestamp=1602225136903&sign=CRDIzGpxk7rAxdyIN6TTi7vL5ACGYe9QgJjJltL5VAY%3D`, {
          dataType: 'json',
          method: 'POST',
          contentType:'json',
          data: {
            "msgtype": "text",
            "text": {
              "content": `硬件异常${info.err_msg},机器号为${machine_id}`
            },
            "at":{"atMobiles":["+86-18278818963"],
              "isAtAll":false
            }},
          timeout:10000,

        });
        console.log(res,'resresres')
      }
    }
    let newInfo = {
      machine_id: machine_id || 'NULL',
      ...info
    }
    return this.ctx.model.Hardware.create(newInfo);
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.Hardware.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    console.log(user,'user');

    return user.update(updates);
  }

}

module.exports = ServerCount;
