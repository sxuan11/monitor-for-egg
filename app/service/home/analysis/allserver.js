'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findAllServerByDate({start_date , end_date , offset, limit}) {
    // let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allServer = await this.ctx.model.ServerCount.findAndCountAll({
      where: {created_at: {[Op.gte]: start_date, [Op.lte]: end_date}},
      offset,
      limit
    })
    return allServer;
  }

}

module.exports = Analysis;
