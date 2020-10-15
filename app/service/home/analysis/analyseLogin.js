'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findAnalyseLogin({start_date, end_date}) {

    let allLogin = await this.ctx.model.AnalyseLogins.findAndCountAll({
      where: {date: {[Op.gte]: start_date, [Op.lte]: end_date}},
    })
    let column = []
    let tableInfo = {}
    tableInfo.count = []
    let data = {

    }
    for(let item of allLogin.rows){
      let date = item.date
      let count = item.counts
      let obj = {
        date,count
      }
      tableInfo.count.push(obj)
      for(let item2 of item.login_data.column){
        column.push(item2)
      }
    }
    data.column = column
    data.count = allLogin.count
    data.tableInfo = tableInfo
    return data;
  }

}

module.exports = Analysis;
