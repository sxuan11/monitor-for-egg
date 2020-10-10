'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findAllHardwareByDate({start_date , end_date , offset, limit }) {
    // let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allHardware = await this.ctx.model.Hardware.findAndCountAll({
      where: {created_at: {[Op.gte]: start_date, [Op.lte]: end_date}},
      offset,
      order: [
        ['created_at', 'DESC']
      ],
      limit
    })
    for (let item of allHardware.rows) {
      switch (item.hardware) {
        case 'PRINT':
          item.hardware = '大打印機'
          break;
        case 'READ_CARD':
          item.hardware = '读卡器'
          break;
        case 'HandWrite':
          item.hardware = '手写板'
          break;
        case 'ID_CARD':
          item.hardware = '刷卡器'
          break;
        case 'MS_PRINT':
          item.hardware = '打印机'
          break;
        case 'CAMERA':
          item.hardware = '摄像头'
          break;
        default:
          break;
      }
    }
    return allHardware;
  }

}

module.exports = Analysis;
