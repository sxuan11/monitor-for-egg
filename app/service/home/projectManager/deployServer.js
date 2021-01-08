'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const { exec , execSync } = require('child_process');

class DeployServer extends Service {
  async envCheck() {
    let info = await this.ctx.model.DeployServers.findAndCountAll();
    return info.rows.length !== 0
  }

  async firstDeploy(body) {
    console.log(body,'body');
    let clone = await execSync(`git clone -b ${body.git_branch} ${body.git_url}`,{cwd:body.folder_path})
    let log = await execSync('git log --oneline',{cwd:body.folder_path+'\\'+body.git_name})
    let logArr = log.toString().split('\n')
    const folder = fs.readdirSync(body.folder_path)
    let gitObj = {
      gitLog:logArr,
      folder
    }
    return gitObj
  }


}

module.exports = DeployServer;
