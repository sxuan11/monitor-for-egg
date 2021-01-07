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
    hos_name: { type: 'string', required: true, example: '新丰卫生院' }, // 医院名称
    hos_url: { type: 'string', required: true, example: 'http://127.0.0.1:3030/projectManager' }, // 医院服务url
  },
};
