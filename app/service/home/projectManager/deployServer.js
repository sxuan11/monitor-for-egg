'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path')
const { exec , execSync } = require('child_process');

function deleteFolderRecursive(url) {
  let files = [];
  /**
   * 判断给定的路径是否存在
   */
  if (fs.existsSync(url)) {
    /**
     * 返回文件和子目录的数组
     */
    files = fs.readdirSync(url);
    files.forEach(function (file, index) {

      let curPath = path.join(url, file);
      /**
       * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
       */
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);

      } else {
        fs.unlinkSync(curPath);
      }
    });
    /**
     * 清除文件夹
     */
    fs.rmdirSync(url);
  } else {
    return "给定的路径不存在，请给出正确的路径"
  }
}


class DeployServer extends Service {
  async envCheck() {
    let info = await this.ctx.model.DeployServers.findAndCountAll();
    if(info.rows.length !== 0){
      let retinfo = JSON.parse(JSON.stringify(info.rows[0]))
      let dataIndex = []
      for await (let item of retinfo.folder_info.gitLog){
        let info2 = item.split(' ')
        info2.splice(0,1)
        let obj = {
          git_message:info2.join(' '),
          git_hash:item.split(' ')[0],
        }
        dataIndex.push(obj);
      }
      retinfo.dataIndex = dataIndex
      return retinfo
    }else{
      return false
    }
  }

  async firstDeploy(body) {
    const ctx = this.ctx;
    let clone = await execSync(`git clone -b ${body.git_branch} ${body.git_url}`,{cwd:body.folder_path})
    let log = await execSync('git log --oneline',{cwd:body.folder_path+'\\'+body.git_name})
    let logArr = log.toString().split('\n')
    const folder = await fs.readdirSync(body.folder_path)
    if(folder.includes('zzj-front')){
      fs.renameSync(`${body.folder_path}\\zzj-front`,`${body.folder_path}\\zzj-front_deploy_bak`)
    }
    if(folder.includes(body.git_name)){
      fs.renameSync(`${body.folder_path}\\${body.git_name}`,`${body.folder_path}\\zzj-front`)
    }
    const newFolder = fs.readdirSync(body.folder_path)
    let gitObj = {
      gitLog:logArr,
      folder:newFolder
    }
    let otherInfo = {
      first_deploy_user:ctx.state.user.user_name,
      git_name:body.git_name,
    }
    let info = {
      folder_info:gitObj,
      folder_path:body.folder_path,
      now_hash:gitObj.gitLog[0].split(' ')[0],
      git_url:body.git_url,
      git_branch:body.git_branch,
      other_info:otherInfo
    }
    await execSync(`git clone -b ${body.git_branch} ${body.git_url}`,{cwd:body.folder_path})
    await fs.renameSync(`${body.folder_path}\\${body.git_name}`,`${body.folder_path}\\use_check_dont_delete`)
    return await ctx.model.DeployServers.create(info);
  }

  async checkGitLog(){
    let info = await this.ctx.model.DeployServers.findAndCountAll();
    let newInfo = info.rows[0]
    const folder = fs.readdirSync(newInfo.folder_path)
    if(!folder.includes('use_check_dont_delete')){
      await execSync(`git clone -b ${newInfo.git_branch} ${newInfo.git_url}`,{cwd:newInfo.folder_path})
      await fs.renameSync(`${newInfo.folder_path}\\${newInfo.git_name}`,`${newInfo.folder_path}\\use_check_dont_delete`)
    }
    let log = await execSync('git log --oneline',{cwd:newInfo.folder_path+'\\'+'use_check_dont_delete'}).toString().split('\n')
    let dataIndex = []
    for await (let item of log){
      let info2 = item.split(' ')
      info2.splice(0,1)
      let obj = {
        git_message:info2.join(' '),
        git_hash:item.split(' ')[0],
      }
      dataIndex.push(obj);
    }
    return dataIndex
  }

  async updateproject({to_hash,id}){
    const info = await this.ctx.model.DeployServers.findByPk(id);
    if(to_hash == info.now_hash){
      return {code:400,message:'更新的hash不能和当前使用的一样'}
    }
    const folder = fs.readdirSync(info.folder_path)
    if(!folder.includes('use_check_dont_delete')){
      await execSync(`git clone -b ${info.git_branch} ${info.git_url}`,{cwd:info.folder_path})
      await fs.renameSync(`${info.folder_path}\\${info.git_name}`,`${info.folder_path}\\use_check_dont_delete`)
    }
    await execSync('git pull',{cwd:info.folder_path+'\\'+'use_check_dont_delete'})
    if(folder.includes(info.other_info.git_name)){
      await deleteFolderRecursive(info.folder_path+'\\'+info.other_info.git_name)
    }
    if(folder.includes('zzj-front_'+to_hash)){
      await fs.renameSync(`${info.folder_path}\\zzj-front`,`${info.folder_path}\\zzj-front_${info.now_hash}`)
      await fs.renameSync(`${info.folder_path}\\zzj-front_${to_hash}`,`${info.folder_path}\\zzj-front`)
      let log = await execSync('git log --oneline',{cwd:info.folder_path+'\\'+'use_check_dont_delete'})
      let newfolder = fs.readdirSync(info.folder_path)
      let folder_info = {
        gitLog:log.toString().split('\n'),
        folder:newfolder
      }
      let other_info = {
        ...info.other_info,
        last_update_user:this.ctx.state.user.user_name,
      }
      let uptateInfo = {
        now_hash:to_hash,
        folder_info,
        other_info,
      }
      let nowupdate = await info.update(uptateInfo);
      let retinfo = JSON.parse(JSON.stringify(nowupdate))
      let dataIndex = []
      for await (let item of retinfo.folder_info.gitLog){
        let info2 = item.split(' ')
        info2.splice(0,1)
        let obj = {
          git_message:info2.join(' '),
          git_hash:item.split(' ')[0],
        }
        dataIndex.push(obj);
      }
      retinfo.dataIndex = dataIndex
      return retinfo
    }
    else{
      let clone = await execSync(`git clone -b ${info.git_branch} ${info.git_url}`,{cwd:info.folder_path})
      await execSync(`git reset --hard ${to_hash}`,{cwd:info.folder_path+'\\'+info.other_info.git_name})
      await fs.renameSync(`${info.folder_path}\\zzj-front`,`${info.folder_path}\\zzj-front_${info.now_hash}`)
      await fs.renameSync(`${info.folder_path}\\${info.other_info.git_name}`,`${info.folder_path}\\zzj-front`)
      let log = await execSync('git log --oneline',{cwd:info.folder_path+'\\'+'use_check_dont_delete'})
      let newfolder = fs.readdirSync(info.folder_path)
      let folder_info = {
        gitLog:log.toString().split('\n'),
        folder:newfolder
      }
      let other_info = {
        ...info.other_info,
        last_update_user:this.ctx.state.user.user_name,
      }
      let uptateInfo = {
        now_hash:to_hash,
        folder_info,
        other_info,
      }
      let nowupdate = await info.update(uptateInfo);
      let retinfo = JSON.parse(JSON.stringify(nowupdate))
      let dataIndex = []
      for await (let item of retinfo.folder_info.gitLog){
        let info2 = item.split(' ')
        info2.splice(0,1)
        let obj = {
          git_message:info2.join(' '),
          git_hash:item.split(' ')[0],
        }
        dataIndex.push(obj);
      }
      retinfo.dataIndex = dataIndex
      return retinfo
    }
  }


}

module.exports = DeployServer;
