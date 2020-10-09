const Subscription = require('egg').Subscription;

class Test extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '100m', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      // immediate:true,
      env: ["dev", "debug","local"],
      disable:true
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const res = await this.ctx.curl(`https://oapi.dingtalk.com/robot/send?access_token=88e9f417717e0d18f5dfe479d95a6ee2118d01c17013b4539b7e9f090f77bd48&timestamp=1602225136903&sign=CRDIzGpxk7rAxdyIN6TTi7vL5ACGYe9QgJjJltL5VAY%3D`, {
      dataType: 'json',
      method: 'POST',
      contentType:'json',
      data: {
        "msgtype":"link",
        "link": {
          "text": "你好马老板",
          "title": "报警",
          "picUrl": "",
          "messageUrl": "http://47.102.100.226/"
        },
        "at":{"atMobiles":["+86-18278818963"],
        "isAtAll":false}},
      timeout:10000,

    });
    console.log(res,'resresres')
  }
}

module.exports = Test;