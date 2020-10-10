'use strict';

const Sequelize = require("sequelize");
const Service = require('egg').Service;
const moment = require('moment')
let Op = Sequelize.Op;

class Analysis extends Service {

  async findUserByDate({date, offset = 0, limit = 0}) {
    let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allUser = await this.ctx.model.User.findAndCountAll({
      where: {created_at: {[Op.gte]: date, [Op.lte]: tomorrow}},
      offset,
    })
    let column = []
    let ID_CARD = {
      type: '身份证',
      counts: 0
    }
    let SOC_CARD = {
      type: '社保卡',
      counts: 0
    }
    let FACE = {
      type: '人脸识别',
      counts: 0
    }
    let NUM_INPUT_IDCARD = {
      type: '身份证输入',
      counts: 0
    }
    let NUM_INPUT_NUM = {
      type: '就诊卡输入',
      counts: 0
    }
    let QR_CODE = {
      type: '电子健康码',
      counts: 0
    }
    for (let item of allUser.rows) {
      switch (item.login_mode) {
        case "ID_CARD":
          ID_CARD.counts++;
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
    }
    column.push(ID_CARD, SOC_CARD, FACE, NUM_INPUT_IDCARD, NUM_INPUT_NUM, QR_CODE)
    allUser.column = column
    delete (allUser["rows"]);
    return allUser;
  }

  async findFunByDate({date, offset = 0, limit = 0}) {
    const {ctx} = this
    let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allFun = await ctx.model.Funcount.findAndCountAll({
      where: {created_at: {[Op.gte]: date, [Op.lte]: tomorrow}},
      offset,
    })
    let column = []
    let QR_signup0 = {
      fun_name: '注册健康码',
      counts: 0,
      is_effect: '未完成使用'
    }
    let QR_signup1 = {
      fun_name: '注册健康码',
      counts: 0,
      is_effect: '完成使用'
    }
    let face_edit0 = {
      fun_name: '人脸信息',
      counts: 0,
      is_effect: '未完成使用'
    }
    let face_edit1 = {
      fun_name: '人脸信息',
      counts: 0,
      is_effect: '完成使用'
    }
    let guahao0 = {
      fun_name: '挂号',
      counts: 0,
      is_effect: '未完成使用'
    }
    let guahao1 = {
      fun_name: '挂号',
      counts: 0,
      is_effect: '完成使用'
    }
    let menzhen_pay0 = {
      fun_name: '门诊支付',
      counts: 0,
      is_effect: '未完成使用'
    }
    let menzhen_pay1 = {
      fun_name: '门诊支付',
      counts: 0,
      is_effect: '完成使用'
    }
    let soc_pay0 = {
      fun_name: '社保支付',
      counts: 0,
      is_effect: '未完成使用'
    }
    let soc_pay1 = {
      fun_name: '社保支付',
      counts: 0,
      is_effect: '完成使用'
    }
    let print0 = {
      fun_name: '自助打印',
      counts: 0,
      is_effect: '未完成使用'
    }
    let print1 = {
      fun_name: '自助打印',
      counts: 0,
      is_effect: '完成使用'
    }
    let daily_list0 = {
      fun_name: '住院清单',
      counts: 0,
      is_effect: '未完成使用'
    }
    let daily_list1 = {
      fun_name: '住院清单',
      counts: 0,
      is_effect: '完成使用'
    }
    let zhuyuan_pay0 = {
      fun_name: '住院缴费',
      counts: 0,
      is_effect: '未完成使用'
    }
    let zhuyuan_pay1 = {
      fun_name: '住院缴费',
      counts: 0,
      is_effect: '完成使用'
    }
    let jiandang0 = {
      fun_name: '建档',
      counts: 0,
      is_effect: '未完成使用'
    }
    let jiandang1 = {
      fun_name: '建档',
      counts: 0,
      is_effect: '完成使用'
    }
    let guahao_recored0 = {
      fun_name: '挂号记录',
      counts: 0,
      is_effect: '未完成使用'
    }
    let guahao_recored1 = {
      fun_name: '挂号记录',
      counts: 0,
      is_effect: '完成使用'
    }
    for (let item of allFun.rows) {
      switch (item.fun_name) {
        case "QR_signup":
          if (item.is_effect === '0') {
            QR_signup0.counts++
          } else {
            QR_signup1.counts++
          }
          break;
        case "face_edit":
          if (item.is_effect === '0') {
            face_edit0.counts++
          } else {
            face_edit1.counts++
          }
          break;
        case "guahao":
          if (item.is_effect === '0') {
            guahao0.counts++
          } else {
            guahao1.counts++
          }
          break;
        case "menzhen_pay":
          if (item.is_effect === '0') {
            menzhen_pay0.counts++
          } else {
            menzhen_pay1.counts++
          }
          break;
        case "soc_pay":
          if (item.is_effect === '0') {
            soc_pay0.counts++
          } else {
            soc_pay1.counts++
          }
          break;
        case "print":
          if (item.is_effect === '0') {
            print0.counts++
          } else {
            print1.counts++
          }
          break;
        case "zhuyuan_pay":
          if (item.is_effect === '0') {
            zhuyuan_pay0.counts++
          } else {
            zhuyuan_pay1.counts++
          }
          break;
        case "daily_list":
          if (item.is_effect === '0') {
            daily_list0.counts++
          } else {
            daily_list1.counts++
          }
          break;
        case "jiandang":
          if (item.is_effect === '0') {
            jiandang0.counts++
          } else {
            jiandang1.counts++
          }
          break;
        case "guahao_recored":
          if (item.is_effect === '0') {
            guahao_recored0.counts++
          } else {
            guahao_recored1.counts++
          }
          break;
        default:
          break;
      }
    }
    column.push(jiandang0,jiandang1,guahao0, guahao1, menzhen_pay0, menzhen_pay1, soc_pay0, soc_pay1, print0, print1, QR_signup0, QR_signup1, face_edit0, face_edit1
      ,guahao_recored0,guahao_recored1, daily_list0, daily_list1, zhuyuan_pay0, zhuyuan_pay1)
    allFun.column = column
    delete (allFun["rows"]);
    return allFun
  }

  async findHardwareByDate({date, offset = 0, limit = 0}) {
    let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allHareware = await this.ctx.model.Hardware.findAndCountAll({
      where: {created_at: {[Op.gte]: date, [Op.lte]: tomorrow}},
      offset,
    })
    let column = []
    let READ_CARD = {
      type: '读卡器',
      counts: 0
    }
    let HandWrite = {
      type: '手写板',
      counts: 0
    }
    let PRINT = {
      type: '大打印机',
      counts: 0
    }
    let MS_PRINT = {
      type: '打印机',
      counts: 0
    }
    let ID_CARD = {
      type: '刷卡器',
      counts: 0
    }
    let CAMERA = {
      type: '摄像头',
      counts: 0
    }
    for (let item of allHareware.rows) {
      switch (item.hardware) {
        case "ID_CARD":
          ID_CARD.counts++;
          break;
        case "READ_CARD":
          READ_CARD.counts++;
          break;
        case "HandWrite":
          HandWrite.counts++;
          break;
        case "PRINT":
          PRINT.counts++;
          break;
        case "MS_PRINT":
          MS_PRINT.counts++;
          break;
        case "CAMERA":
          CAMERA.counts++;
          break;
        default:
          break;
      }
    }
    column.push(MS_PRINT, READ_CARD, CAMERA, HandWrite, PRINT, ID_CARD)
    allHareware.column = column
    delete (allHareware["rows"]);
    return allHareware;
  }

  async findServerByDate({date, offset = 0, limit = 0}) {
    let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allServer = await this.ctx.model.ServerCount.findAndCountAll({
      where: {created_at: {[Op.gte]: date, [Op.lte]: tomorrow}},
      offset,
    })
    let tempArr = []
    //获取数组
    for (let item of allServer.rows) {
      tempArr.push(item.req.request_url)
    }
    //去重
    let apiArr = Array.from(new Set(tempArr));
    let abcArr = []
    //添加标识
    apiArr.map((value) => {
      let a = `${value}0`
      let b = `${value}1`
      abcArr.push(a, b)
    })
    let defArr = []
    //生产变量
    for (let item of abcArr) {
      if (item.substr(-1) == 0) {
        let itemInfo = {
          type: item.substring(0, item.length - 1),
          counts: 0,
          success: '失败'
        }
        defArr.push(itemInfo)
      } else {
        let itemInfo = {
          type: item.substring(0, item.length - 1),
          counts: 0,
          success: '成功'
        }
        defArr.push(itemInfo)
      }
    }
    let ghlArr = JSON.parse(JSON.stringify(defArr))
    //添加计算
    ghlArr.map((value, index) => {
      for (let item of allServer.rows) {
        if (item.req.request_url === value.type) {
          if (item.res_code == 200) {
            if (value.success === '成功') {
              value.counts++
            }
          } else {
            if (value.success === '失败') {
              value.counts++
            }
          }
        }
      }
    })
    allServer.column = ghlArr
    delete (allServer["rows"]);
    return allServer;
  }

  async findJsByDate({date, offset = 0, limit = 0}) {
    let tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    let allJs = await this.ctx.model.JsErrs.findAndCountAll({
      where: {created_at: {[Op.gte]: date, [Op.lte]: tomorrow}},
      offset,
    })
    let tempArr = []
    //获取数组
    for (let item of allJs.rows) {
      tempArr.push(item.err_msg)
    }
    //去重
    let abcArr = Array.from(new Set(tempArr));
    //生产变量
    let defArr = []
    for (let item of abcArr) {
      let itemInfo = {
        type: item,
        counts: 0,
      }
      defArr.push(itemInfo)
    }
    for(let item of allJs.rows){
      for(let item2 of defArr){
        if(item.err_msg === item2.type){
          item2.counts++
        }
      }
    }
    allJs.column = defArr
    delete (allJs["rows"]);
    return allJs;
  }

}

module.exports = Analysis;
