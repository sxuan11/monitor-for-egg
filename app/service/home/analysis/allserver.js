'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findAllServerByDate({start_date, end_date, offset, limit, filters}) {
    // let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allServer = ''
    if (filters) {
      if (filters.hasOwnProperty('request_params') && filters.request_params != '') {
        allServer= await this.ctx.model.ServerCount.findAndCountAll({
          where: {
            created_at:
              {
                [Op.gte]: start_date,
                [Op.lte]: end_date
              },
            request_params: {
              [Op.substring]: filters.request_params
            }
          },
          order: [
            ['created_at', 'DESC']
          ],
          offset,
          limit
        })
      }else if(filters.hasOwnProperty('request_data') && filters.request_data != ''){
        allServer= await this.ctx.model.ServerCount.findAndCountAll({
          where: {
            created_at:
              {
                [Op.gte]: start_date,
                [Op.lte]: end_date
              },
            request_data: {
              [Op.substring]: filters.request_data
            }
          },
          order: [
            ['created_at', 'DESC']
          ],
          offset,
          limit
        })
      }else if(filters.hasOwnProperty('res_code') && filters.res_code != ''){
        allServer= await this.ctx.model.ServerCount.findAndCountAll({
          where: {
            created_at:
              {
                [Op.gte]: start_date,
                [Op.lte]: end_date
              },
            res_code: {
              [Op.substring]: filters.res_code
            }
          },
          order: [
            ['created_at', 'DESC']
          ],
          offset,
          limit
        })
      }else {
        allServer= await this.ctx.model.ServerCount.findAndCountAll({
          where: {
            created_at:
              {
                [Op.gte]: start_date,
                [Op.lte]: end_date
              },
          },
          order: [
            ['created_at', 'DESC']
          ],
          offset,
          limit
        })
      }
    }else {
      allServer= await this.ctx.model.ServerCount.findAndCountAll({
        where: {
          created_at:
            {
              [Op.gte]: start_date,
              [Op.lte]: end_date
            },
        },
        order: [
          ['created_at', 'DESC']
        ],
        offset,
        limit
      })
    }

    return allServer;
  }

}

module.exports = Analysis;
