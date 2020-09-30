'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findAllUserByDate({date, offset = 0, limit = 10}) {
    let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allUser = await this.ctx.model.User.findAndCountAll({
      where: {created_at: {[Op.gte]: date, [Op.lte]: tomorrow}},
      offset,
      limit
    })
    allUser.count = allUser.count * 10
    for (let item of allUser.rows) {
      switch (item.login_mode) {
        case 'NUM_INPUT_IDCARD':
          item.login_mode = '身份证输入'
          break;
        case 'SOC_CARD':
          item.login_mode = '社保卡'
          break;
        case 'NUM_INPUT_NUM':
          item.login_mode = '就诊卡输入'
          break;
        case 'ID_CARD':
          item.login_mode = '身份证'
          break;
        case 'FACE':
          item.login_mode = '人脸识别'
          break;
        case 'QR_CODE':
          item.login_mode = '电子健康码'
          break;
        default:
          break;
      }
    }
    return allUser;
  }

}

module.exports = Analysis;
