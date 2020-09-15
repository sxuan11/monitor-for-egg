const Service = require('egg').Service;

class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async find(info) {
    const {app} = this
    const user = await app.mysql.get('userinfo', { username:info.userName});
    const token = app.jwt.sign({userName: info.userName,}, app.config.jwt.secret);
    if(user !== null){
      const row = {
        id: user.id,
        token,
      };
      const result = await app.mysql.update('userinfo', row);
      if(result.affectedRows !== 1){
        return
      }
    }else{
      const result = await app.mysql.insert('userinfo', { username:info.userName,token,phone:info.phone,lastLogin:'000'});
      if(result.affectedRows !== 1){
        return
      }
    }
    const newUser = await app.mysql.get('userinfo', { username:info.userName});
    return{
      newUser
    }
  }
}

module.exports = UserService;
