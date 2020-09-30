'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findAllFunByDate({date, offset, limit}) {
    let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allFun = await this.ctx.model.Funcount.findAndCountAll({
      where: {created_at: {[Op.gte]: date, [Op.lte]: tomorrow}},
      offset,
      limit
    })

    return allFun;
  }
}

module.exports = Analysis;
