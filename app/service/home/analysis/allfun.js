'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findAllFunByDate({start_date , end_date , offset, limit}) {
    // let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allFun = await this.ctx.model.Funcount.findAndCountAll({
      where: {created_at: {[Op.gte]: start_date, [Op.lte]: end_date}},
      offset,
      limit
    })
    for (let item of allFun.rows) {
      switch (item.fun_name) {
        case 'jiandang':
          item.fun_name = '建档'
          break;
        case 'guahao':
          item.fun_name = '挂号'
          break;
        case 'menzhen_pay':
          item.fun_name = '门诊缴费'
          break;
        case 'print':
          item.fun_name = '报告打印'
          break;
        case 'QR_signup':
          item.fun_name = '申领电子健康码'
          break;
        case 'face_edit':
          item.fun_name = '查看人脸'
          break;
        case 'daily_list':
          item.fun_name = '每日清单'
          break;
        case 'zhuyuan_pay':
          item.fun_name = '住院缴费'
          break;
        default:
          break;
      }
      switch (item.is_effect) {
        case '0':
          item.is_effect = '未完成使用'
          break;
        case '1':
          item.is_effect = '完成使用'
          break;
        default:
          break;
      }
    }
    return allFun;
  }
}

module.exports = Analysis;
