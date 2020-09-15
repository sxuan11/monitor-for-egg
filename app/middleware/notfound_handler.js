module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    // if (ctx.status === 404 && !ctx.body) {
    //   if (ctx.acceptJSON) {
    //     ctx.body = { error: 'Not Found' };
    //   } else {
    //     ctx.body = '<h1>服务器找不到路径啦</h1>';
    //   }
    // }
  };
};