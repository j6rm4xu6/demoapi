module.exports = function (namespace = '') {
    const [entrance, scope, readWrite] = namespace.split(/:/);

    return async (ctx, next) => {
      const token = ctx.state.token;

      if (ctx.state.openApi) {
        return await next();
      }

      if (entrance && !token[entrance]) {
        return ctx.status = 401;
      }

      if (scope && !token.scope.includes(scope)) {
        return ctx.status = 401;
      }

      // 可讀
      if (readWrite && ctx.method == 'GET' && !(readWrite == 'r' || readWrite == 'rw')) {
        return ctx.status = 401;
      }

      // 可寫
      if (readWrite && ctx.method != 'GET' && !(readWrite == 'w' || readWrite == 'rw')) {
        return ctx.status = 401;
      }

      return await next();
    };
  };
