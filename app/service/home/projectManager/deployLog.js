'use strict';

const Service = require('egg').Service;
const fs = require('fs');

class DeployLog extends Service {
  async addLog(info) {
    const { app , ctx  } = this;
    let newInfo = {
      user : ctx.state.user.user_name,
      ...info
    }
    return this.ctx.model.DeployLogs.create(newInfo);
  }

  async getLog() {
    return await this.ctx.model.DeployLogs.findAndCountAll();
  }

}

module.exports = DeployLog;
