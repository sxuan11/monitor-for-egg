const Subscription = require('egg').Subscription;
const Sequelize = require("sequelize");
const moment = require('moment')
let Op = Sequelize.Op;

class Analyse_login extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      // interval: '30m', // 1 分钟间隔
      type: 'worker', // 指定所有的 worker 都需要执行
      // immediate:true,
      // env: ["dev", "debug","local"],
      cron: '0 01 01 * * *',
      // disable:true
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    let { ctx , model} = this
    let yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    let today = moment().subtract(0, 'days').format('YYYY-MM-DD');
    let allUser = await this.ctx.model.User.findAndCountAll({
      where: {created_at: {[Op.gte]: yesterday, [Op.lte]: today}},
    })
    let allCount = {}
    // allCount.count = allUser.count
    allCount.column = []
    let countID_CARD = []
    let all_time = {
      date:yesterday,
      type: '总人次',
      counts: allUser.count
    }
    let ID_CARD = {
      date:yesterday,
      type: '身份证',
      counts: 0
    }
    let SOC_CARD = {
      date:yesterday,
      type: '社保卡',
      counts: 0
    }
    let FACE = {
      date:yesterday,
      type: '人脸识别',
      counts: 0
    }
    let NUM_INPUT_IDCARD = {
      date:yesterday,
      type: '身份证输入',
      counts: 0
    }
    let NUM_INPUT_NUM = {
      date:yesterday,
      type: '就诊卡输入',
      counts: 0
    }
    let QR_CODE = {
      date:yesterday,
      type: '电子健康码',
      counts: 0
    }
    let PATIENT_ID = {
      date:yesterday,
      type: '登记号',
      counts: 0
    }
    let MEDICAL_CARD = {
      date:yesterday,
      type: '就诊卡',
      counts: 0
    }
    for(let item of allUser.rows){
      switch (item.login_mode) {
        case "ID_CARD":
          ID_CARD.counts++;
          break;
        case "PATIENT_ID":
          PATIENT_ID.counts++;
          break;
        case "MEDICAL_CARD":
          MEDICAL_CARD.counts++;
          break;
        case "SOC_CARD":
          SOC_CARD.counts++;
          break;
        case "FACE":
          FACE.counts++;
          break;
        case "NUM_INPUT_IDCARD":
          NUM_INPUT_IDCARD.counts++;
          break;
        case "NUM_INPUT_NUM":
          NUM_INPUT_NUM.counts++;
          break;
        case "QR_CODE":
          QR_CODE.counts++;
          break;
        default:
          break;
      }
      countID_CARD.push(item.idcard)
    }
    countID_CARD = Array.from(new Set(countID_CARD))
    let all_person = {
      date:yesterday,
      type: '总人数',
      counts: countID_CARD.length
    }
    allCount.column.push(all_time,all_person,ID_CARD, SOC_CARD, FACE, NUM_INPUT_IDCARD, NUM_INPUT_NUM, QR_CODE, PATIENT_ID, MEDICAL_CARD)
    let data = {
      date:yesterday,
      login_data:allCount,
      counts:allUser.count
    }
    await this.ctx.model.AnalyseLogins.create(data);
  }

}

module.exports = Analyse_login;
