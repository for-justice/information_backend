// this is a web middleware just for some router

import { WebMiddleware, provide, config, plugin } from 'midway';

@provide()
export class ApiJwtMiddleware implements WebMiddleware {
  @plugin('jwt')
  jwt;

  @config('jwt')
  jwtConfig;
  @config('hello')
  helloConfig;

  resolve() {
    return async (ctx, next) => {
      console.log()
      try {
        this.jwt.verify(ctx.header.a,this.jwt.secret)
      } catch (error) {
        return ctx.body = 'json web token invalid '
      }
      await next();
    };
  }

}