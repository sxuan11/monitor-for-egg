'use strict';
module.exports = {
  createResource: {
    resourceId: { type: 'string', required: true, example: '1' },
    resourceNametrue: { type: 'string', required: false },
    resourceType: { type: 'string', required: true, enum: ['video', 'game', 'image'] },
    resourceTag: { type: 'array', itemType: 'string' },
    owner: { type: 'User', required: true },
    owners: { type: 'array', itemType: 'User' },
  },
  queryHos:{
    id:{type:'string', required: true, example: '1'}
  },
  createHos: {
    hos_name: { type: 'string', required: true, example: '新丰卫生院' ,description:'医院名称'}, //
    hos_url: { type: 'string', required: true, example: 'http://127.0.0.1:3030/projectManager' ,description:'医院服务url'}, //
  },
  createDeploy: {
    folder_path: { type: 'string', required: true, example: 'E:\\ck\\H5Dist',description:'文件夹名称' }, //
    git_url: { type: 'string', required: true, example: 'http://609311490%40qq.com:12345678@120.77.243.114:8899/dist/xfwsy.git',description:'giturl' }, // 医院服务url
    git_branch: { type: 'string', required: true, example: 'fcjd',description:'git分支名称' }, //
    git_name: { type: 'string', required: true, example: 'xfwsy' ,description:'git仓库名称'}, //
  },
  updateProject:{
    to_hash: { type: 'string', required: true, example: '04ece98',description:'更新的目标hash值' },
    id: { type: 'string', required: true, example: '1',description:'id' },
  },
  deployLog:{
    log_action: { type: 'string', required: false, example: '04ece98',description:'日志行为' },
    target: { type: 'string', required: false, example: '1',description:'目标项目' },
    other_info: { type: 'object', required: false, example: '{}',description:'other_info' },
  },
  getDeployLog:{
    offset: { type: 'string', required: false, example: '0',description:'当前页码' },
    limit: { type: 'string', required: false, example: '10',description:'每页数量' },
    startDate: { type: 'string', required: false, example: '2020-01-12',description:'开始日期' },
    endDate: { type: 'string', required: false, example: '2020-01-12',description:'结束日期' },
    filters: { type: 'object', required: false, example: '{}',description:'过滤参数' },
  }
};
