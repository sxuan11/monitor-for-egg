'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findAllServerByDate({start_date , end_date , offset, limit,filters}) {
    // let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    console.log(filters,'filters');
    let request_params = ''
    if(filters){
      if(filters.hasOwnProperty('request_params')){
        request_params = filters.request_params
      }
    }
    let allServer = await this.ctx.model.ServerCount.findAndCountAll({
      where: {
        created_at:
          {
            [Op.gte]: start_date,
            [Op.lte]: end_date
          },
        request_params:{
          [Op.substring]: request_params
        }
        },
      order: [
        ['created_at', 'DESC']
      ],
      offset,
      limit
    })
    return allServer;
  }

}

module.exports = Analysis;
