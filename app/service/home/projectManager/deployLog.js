'use strict';

const Service = require('egg').Service;
const Sequelize = require("sequelize");
let Op = Sequelize.Op;

class DeployLog extends Service {
  async addLog(info) {
    const { app , ctx  } = this;
    let newInfo = {
      user : ctx.state.user.user_name,
      ...info
    }
    return this.ctx.model.DeployLogs.create(newInfo);
  }

  async getLog({start_date , end_date , offset, limit, filters}) {
    console.log({start_date , end_date , offset, limit})
    let retInfo = ''
    if (filters) {
      let sql = {
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
      }
      if (filters.hasOwnProperty('user') && filters.user != '') {
        sql.where.user={
          [Op.substring]: filters.user
        }
      }
      if (filters.hasOwnProperty('target') && filters.target != '') {
        sql.where.target={
          [Op.substring]: filters.target
        }
      }
      if (filters.hasOwnProperty('log_action') && filters.log_action != '') {
        sql.where.log_action={
          [Op.eq]: filters.log_action
        }
      }
      retInfo = await this.ctx.model.DeployLogs.findAndCountAll(sql)
    }else {
      retInfo = await this.ctx.model.DeployLogs.findAndCountAll(
        {
          where: {created_at: {[Op.gte]: start_date, [Op.lte]: end_date}},
          order: [
            ['created_at', 'DESC']
          ],
          offset,
          limit
        }
      )
    }
    return retInfo
  }

}

module.exports = DeployLog;
