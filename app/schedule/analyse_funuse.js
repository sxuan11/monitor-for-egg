const Subscription = require('egg').Subscription;
const Sequelize = require("sequelize");
const moment = require('moment')
let Op = Sequelize.Op;

class Analyse_funuse extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      // interval: '30h', // 1 分钟间隔
      type: 'worker', // 指定所有的 worker 都需要执行
      // immediate: true,
      // env: ["dev", "debug","local"],
      cron: '0 05 01 * * *',
      // disable:true
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    let {ctx, model} = this
    let yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    let today = moment().subtract(0, 'days').format('YYYY-MM-DD');
    let allfun = await this.ctx.model.Funcount.findAndCountAll({
      where: {created_at: {[Op.gte]: yesterday, [Op.lte]: today}},
    })
    let allCount = {}
    let aveCount = {}
    let reteCount = {}
    let unuse_times = 0
    let finish_use_times = 0
    // allCount.count = allUser.count
    allCount.column = []
    aveCount.column = []
    reteCount.column = []
    let QR_signup = {
      date: yesterday,
      finish_counts: 0,
      unFinish_counts: 0,
      counts: 0,
      fun_name: '注册健康码',
    }
    let face_edit = {
      date: yesterday,
      finish_counts: 0,
      unFinish_counts: 0,
      counts: 0,
      fun_name: '人脸信息'
    }
    let guahao = {
      date: yesterday,
      finish_counts: 0,
      unFinish_counts: 0,
      counts: 0,
      fun_name: '挂号'
    }
    let menzhen_pay = {
      date: yesterday,
      finish_counts: 0,
      unFinish_counts: 0,
      counts: 0,
      fun_name: '门诊支付'
    }
    let soc_pay = {
      date: yesterday,
      finish_counts: 0,
      unFinish_counts: 0,
      counts: 0,
      fun_name: '社保支付'
    }
    let print = {
      date: yesterday,
      finish_counts: 0,
      unFinish_counts: 0,
      counts: 0,
      fun_name: '自助打印'
    }
    let daily_list = {
      date: yesterday,
      finish_counts: 0,
      unFinish_counts: 0,
      counts: 0,
      fun_name: '住院清单'
    }
    let zhuyuan_pay = {
      date: yesterday,
      finish_counts: 0,
      unFinish_counts: 0,
      counts: 0,
      fun_name: '住院缴费'
    }
    let jiandang = {
      date: yesterday,
      finish_counts: 0,
      unFinish_counts: 0,
      counts: 0,
      fun_name: '建档'
    }
    let guahao_record = {
      date: yesterday,
      finish_counts: 0,
      unFinish_counts: 0,
      counts: 0,
      fun_name: '挂号记录'
    }
    let QR_signup_avetime = {
      date: yesterday,
      allFinishTime: 0,
      aveFinishTime: 0,
      allUnfinishTime: 0,
      aveUnfinishTime: 0,
      allTime: 0,
      aveTime: 0,
      fun_name: '注册健康码',
    }
    let face_edit_avetime = {
      date: yesterday,
      allFinishTime: 0,
      aveFinishTime: 0,
      allUnfinishTime: 0,
      aveUnfinishTime: 0,
      allTime: 0,
      aveTime: 0,
      fun_name: '人脸信息'
    }
    let guahao_avetime = {
      date: yesterday,
      allFinishTime: 0,
      aveFinishTime: 0,
      allUnfinishTime: 0,
      aveUnfinishTime: 0,
      allTime: 0,
      aveTime: 0,
      fun_name: '挂号'
    }
    let menzhen_pay_avetime = {
      date: yesterday,
      allFinishTime: 0,
      aveFinishTime: 0,
      allUnfinishTime: 0,
      aveUnfinishTime: 0,
      allTime: 0,
      aveTime: 0,
      fun_name: '门诊支付'
    }
    let soc_pay_avetime = {
      date: yesterday,
      allFinishTime: 0,
      aveFinishTime: 0,
      allUnfinishTime: 0,
      aveUnfinishTime: 0,
      allTime: 0,
      aveTime: 0,
      fun_name: '社保支付'
    }
    let print_avetime = {
      date: yesterday,
      allFinishTime: 0,
      aveFinishTime: 0,
      allUnfinishTime: 0,
      aveUnfinishTime: 0,
      allTime: 0,
      aveTime: 0,
      fun_name: '自助打印'
    }
    let daily_list_avetime = {
      date: yesterday,
      allFinishTime: 0,
      aveFinishTime: 0,
      allUnfinishTime: 0,
      aveUnfinishTime: 0,
      allTime: 0,
      aveTime: 0,
      fun_name: '住院清单'
    }
    let zhuyuan_pay_avetime = {
      date: yesterday,
      allFinishTime: 0,
      aveFinishTime: 0,
      allUnfinishTime: 0,
      aveUnfinishTime: 0,
      allTime: 0,
      aveTime: 0,
      fun_name: '住院缴费'
    }
    let jiandang_avetime = {
      date: yesterday,
      allFinishTime: 0,
      aveFinishTime: 0,
      allUnfinishTime: 0,
      aveUnfinishTime: 0,
      allTime: 0,
      aveTime: 0,
      fun_name: '建档'
    }
    let guahao_record_avetime = {
      date: yesterday,
      allFinishTime: 0,
      aveFinishTime: 0,
      allUnfinishTime: 0,
      aveUnfinishTime: 0,
      allTime: 0,
      aveTime: 0,
      fun_name: '挂号记录'
    }
    for (let item of allfun.rows) {
      item.stay_time = parseFloat(item.stay_time)
      item.is_effect == '0' ? unuse_times++ : finish_use_times++
      switch (item.fun_name) {
        case "QR_signup":
          QR_signup.counts++
          QR_signup_avetime.allTime += item.stay_time
          if (item.is_effect === '1') {
            QR_signup.finish_counts++
            QR_signup_avetime.allFinishTime += item.stay_time
          }else {
            QR_signup.unFinish_counts++
            QR_signup_avetime.allUnfinishTime += item.stay_time
          }
          break;
        case "face_edit":
          face_edit.counts++
          face_edit_avetime.allTime += item.stay_time
          if (item.is_effect === '1') {
            face_edit.finish_counts++
            face_edit_avetime.allFinishTime += item.stay_time
          }else {
            face_edit.unFinish_counts++
            face_edit_avetime.allUnfinishTime += item.stay_time
          }
          break;
        case "guahao":
          guahao.counts++
          guahao_avetime.allTime += item.stay_time
          if (item.is_effect === '1') {
            guahao.finish_counts++
            guahao_avetime.allFinishTime += item.stay_time
          }else {
            guahao.unFinish_counts++
            guahao_avetime.allUnfinishTime += item.stay_time
          }
          break;
        case "menzhen_pay":
          menzhen_pay.counts++
          menzhen_pay_avetime.allTime += item.stay_time
          if (item.is_effect === '1') {
            menzhen_pay.finish_counts++
            menzhen_pay_avetime.allFinishTime += item.stay_time
          }else {
            menzhen_pay.unFinish_counts++
            menzhen_pay_avetime.allUnfinishTime += item.stay_time
          }
          break;
        case "soc_pay":
          soc_pay.counts++
          soc_pay_avetime.allTime += item.stay_time
          if (item.is_effect === '1') {
            soc_pay.finish_counts++
            soc_pay_avetime.allFinishTime += item.stay_time
          }else {
            soc_pay.unFinish_counts++
            soc_pay_avetime.allUnfinishTime += item.stay_time
          }
          break;
        case "print":
          print.counts++
          print_avetime.allTime += item.stay_time
          if (item.is_effect === '1') {
            print.finish_counts++
            print_avetime.allFinishTime += item.stay_time
          }else {
            print.unFinish_counts++
            print_avetime.allUnfinishTime += item.stay_time
          }
          break;
        case "zhuyuan_pay":
          zhuyuan_pay.counts++
          zhuyuan_pay_avetime.allTime += item.stay_time
          if (item.is_effect === '1') {
            zhuyuan_pay.finish_counts++
            zhuyuan_pay_avetime.allFinishTime += item.stay_time
          }else {
            zhuyuan_pay.unFinish_counts++
            zhuyuan_pay_avetime.allUnfinishTime += item.stay_time
          }
          break;
        case "daily_list":
          daily_list.counts++
          daily_list_avetime.allTime += item.stay_time
          if (item.is_effect === '1') {
            daily_list.finish_counts++
            daily_list_avetime.allFinishTime += item.stay_time
          }else {
            daily_list.unFinish_counts++
            daily_list_avetime.allUnfinishTime += item.stay_time
          }
          break;
        case "jiandang":
          jiandang.counts++
          jiandang_avetime.allTime += item.stay_time
          if (item.is_effect === '1') {
            jiandang.finish_counts++
            jiandang_avetime.allFinishTime += item.stay_time
          }else {
            jiandang.unFinish_counts++
            jiandang_avetime.allUnfinishTime += item.stay_time
          }
          break;
        case "guahao_record":
          guahao_record.counts++
          guahao_record_avetime.allTime += item.stay_time
          if (item.is_effect === '1') {
            guahao_record.finish_counts++
            guahao_record_avetime.allFinishTime += item.stay_time
          }else {
            guahao_record.unFinish_counts++
            guahao_record_avetime.allUnfinishTime += item.stay_time
          }
          break;
        default:
          break;
      }
    }

    QR_signup_avetime.aveTime = QR_signup_avetime.allTime / QR_signup.counts || 0
    face_edit_avetime.aveTime = face_edit_avetime.allTime / face_edit.counts || 0
    guahao_avetime.aveTime = guahao_avetime.allTime / guahao.counts || 0
    menzhen_pay_avetime.aveTime = menzhen_pay_avetime.allTime / menzhen_pay.counts || 0
    soc_pay_avetime.aveTime = soc_pay_avetime.allTime / soc_pay.counts || 0
    print_avetime.aveTime = print_avetime.allTime / print.counts || 0
    daily_list_avetime.aveTime = daily_list_avetime.allTime / daily_list.counts || 0
    zhuyuan_pay_avetime.aveTime = zhuyuan_pay_avetime.allTime / zhuyuan_pay.counts || 0
    jiandang_avetime.aveTime = jiandang_avetime.allTime / jiandang.counts || 0
    guahao_record_avetime.aveTime = guahao_record_avetime.allTime / guahao_record.counts || 0

    QR_signup_avetime.aveFinishTime = QR_signup_avetime.allFinishTime / QR_signup.finish_counts || 0
    face_edit_avetime.aveFinishTime = face_edit_avetime.allFinishTime / face_edit.finish_counts || 0
    guahao_avetime.aveFinishTime = guahao_avetime.allFinishTime / guahao.finish_counts || 0
    menzhen_pay_avetime.aveFinishTime = menzhen_pay_avetime.allFinishTime / menzhen_pay.finish_counts || 0
    soc_pay_avetime.aveFinishTime = soc_pay_avetime.allFinishTime / soc_pay.finish_counts || 0
    print_avetime.aveFinishTime = print_avetime.allFinishTime / print.finish_counts || 0
    daily_list_avetime.aveFinishTime = daily_list_avetime.allFinishTime / daily_list.finish_counts || 0
    zhuyuan_pay_avetime.aveFinishTime = zhuyuan_pay_avetime.allFinishTime / zhuyuan_pay.finish_counts || 0
    jiandang_avetime.aveFinishTime = jiandang_avetime.allFinishTime / jiandang.finish_counts || 0
    guahao_record_avetime.aveFinishTime = guahao_record_avetime.allFinishTime / guahao_record.finish_counts || 0

    QR_signup_avetime.aveUnfinishTime = QR_signup_avetime.allUnfinishTime / QR_signup.unFinish_counts || 0
    face_edit_avetime.aveUnfinishTime = face_edit_avetime.allUnfinishTime / face_edit.unFinish_counts || 0
    guahao_avetime.aveUnfinishTime = guahao_avetime.allUnfinishTime / guahao.unFinish_counts || 0
    menzhen_pay_avetime.aveUnfinishTime = menzhen_pay_avetime.allUnfinishTime / menzhen_pay.unFinish_counts || 0
    soc_pay_avetime.aveUnfinishTime = soc_pay_avetime.allUnfinishTime / soc_pay.unFinish_counts || 0
    print_avetime.aveUnfinishTime = print_avetime.allUnfinishTime / print.unFinish_counts || 0
    daily_list_avetime.aveUnfinishTime = daily_list_avetime.allUnfinishTime / daily_list.unFinish_counts || 0
    zhuyuan_pay_avetime.aveUnfinishTime = zhuyuan_pay_avetime.allUnfinishTime / zhuyuan_pay.unFinish_counts || 0
    jiandang_avetime.aveUnfinishTime = jiandang_avetime.allUnfinishTime / jiandang.unFinish_counts || 0
    guahao_record_avetime.aveUnfinishTime = guahao_record_avetime.allUnfinishTime / guahao_record.unFinish_counts || 0

    allCount.column.push(QR_signup, face_edit, guahao, menzhen_pay, soc_pay, print, daily_list, zhuyuan_pay, jiandang, guahao_record)
    aveCount.column.push(
      QR_signup_avetime, face_edit_avetime, guahao_avetime, menzhen_pay_avetime,
      soc_pay_avetime, print_avetime, daily_list_avetime, zhuyuan_pay_avetime,
      jiandang_avetime, guahao_record_avetime)

    let QR_signup_rate = {
      date: yesterday,
      rate: QR_signup.finish_counts / QR_signup.counts  || 0,
      fun_name: '注册健康码',
    }
    let face_edit_rate = {
      date: yesterday,
      rate: face_edit.finish_counts / face_edit.counts  || 0,
      fun_name: '人脸信息'
    }
    let guahao_rate = {
      date: yesterday,
      rate: guahao.finish_counts / guahao.counts || 0,
      fun_name: '挂号'
    }
    let menzhen_pay_rate = {
      date: yesterday,
      rate: menzhen_pay.finish_counts / menzhen_pay.counts || 0,
      fun_name: '门诊支付'
    }
    let soc_pay_rate = {
      date: yesterday,
      rate: soc_pay.finish_counts / soc_pay.counts || 0,
      fun_name: '社保支付'
    }
    let print_rate = {
      date: yesterday,
      rate: print.finish_counts / print.counts || 0,
      fun_name: '自助打印'
    }
    let daily_list_rate = {
      date: yesterday,
      rate: daily_list.finish_counts / daily_list.counts || 0,
      fun_name: '住院清单'
    }
    let zhuyuan_pay_rate = {
      date: yesterday,
      rate: zhuyuan_pay.finish_counts / zhuyuan_pay.counts || 0,
      fun_name: '住院缴费'
    }
    let jiandang_rate = {
      date: yesterday,
      rate: jiandang.finish_counts / jiandang.counts || 0,
      fun_name: '建档'
    }
    let guahao_record_rate = {
      date: yesterday,
      rate: guahao_record.finish_counts / guahao_record.counts || 0,
      fun_name: '挂号记录'
    }
    reteCount.column.push(QR_signup_rate, face_edit_rate, guahao_rate, menzhen_pay_rate,
      soc_pay_rate, print_rate, daily_list_rate, zhuyuan_pay_rate, jiandang_rate, guahao_record_rate)
    let data = {
      date: yesterday,
      funuse_data: allCount,
      counts: allfun.count,
      unuse_times,
      finish_use_times,
      fun_average_time: aveCount,
      finish_rate:reteCount
    }
    console.log(data);
    await this.ctx.model.AnalyseFunuses.create(data);
  }
}

module.exports = Analyse_funuse;
