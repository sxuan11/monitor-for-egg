'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findAnalyseLogin({start_date, end_date}) {

    let allLogin = await this.ctx.model.AnalyseLogins.findAndCountAll({
      where: {created_at: {[Op.gte]: start_date, [Op.lte]: end_date}},
    })
    let coulm = []
    for(let item of allLogin.rows){
      for(let item2 of item.login_data.column){
        coulm.push(item2)
      }
    }
    return coulm;
  }

}

module.exports = Analysis;
