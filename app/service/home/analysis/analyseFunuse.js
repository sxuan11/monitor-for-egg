'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findAnalyseFunuse({start_date, end_date}) {

    let allFunuse = await this.ctx.model.AnalyseFunuses.findAndCountAll({
      where: {date: {[Op.gte]: start_date, [Op.lte]: end_date}},
    })
    let countsColumn = []
    let fun_average_timeColumn = []
    let finish_rateColumn = []
    let tableInfo = {}
    tableInfo.count = []
    tableInfo.counts = []
    tableInfo.unuse_times = []
    tableInfo.finish_use_times = []
    let data = {}
    for(let item of allFunuse.rows){
      let date = item.date
      let counts = item.counts
      let obj = {date,counts}
      let countsObj = {date,counts,name:'总次数'}
      let unuse_timesObj = {date,unuse_timesObj:item.unuse_timesObj,name:'未完成总次数'}
      let finish_use_timesObj = {date,finish_use_times:item.finish_use_times,name:'完成总次数'}
      tableInfo.counts.push(countsObj)
      tableInfo.unuse_times.push(unuse_timesObj)
      tableInfo.finish_use_times.push(finish_use_timesObj)
      tableInfo.count.push(obj)
      for(let item2 of item.funuse_data.column){
        countsColumn.push(item2)
      }
      for(let item3 of item.fun_average_time.column){
        fun_average_timeColumn.push(item3)
      }
      for(let item4 of item.finish_rate.column){
        finish_rateColumn.push(item4)
      }
    }
    data.countsColumn = countsColumn
    data.finish_use_timesColumn = fun_average_timeColumn
    data.finish_rateColumn = finish_rateColumn
    data.count = allFunuse.count
    data.tableInfo = tableInfo
    return data;
  }

}

module.exports = Analysis;
