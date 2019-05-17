import { controller, get, post, provide, inject, config, plugin } from 'midway';
import { IPostService } from '../../interface';
@provide()
@controller('/post')
export class PostController {
  
  @inject()
  postService: IPostService;
  
  @plugin('jwt')
  jwt:any;

  @config('jwt')
  jwtConfig;

  @get('/')
  
  async index(ctx) {
    const query = {
      limit: parseInt(ctx.query.limit, 10) || 10,
      offset: parseInt(ctx.query.offset, 10) || 0,
    };

    ctx.body = await this.postService.list(query);
  }

  @get('/find')
  async show(ctx) {
    ctx.body = await this.postService.find(parseInt(ctx.query.id, 10));
  }


  @get('/token')
  async api(ctx) {
    console.log(this.jwt);
    const token = this.jwt.sign({ foo: 'bar' }, this.jwt.secret);
    ctx.body = token;
  }

  @post('/create',{middleware:['apiJwtMiddleware']})
  async create(ctx) {
    console.log(ctx.request.body);
    await this.postService.create(ctx.request.body);
    return ctx.helper.success(ctx,200,'successs','123');
  }

  @post('/update')
  async update(ctx) {
    const id = parseInt(ctx.request.body.id, 10);
    ctx.body = await this.postService.update(
      id,
      ctx.request.body.updates,
    );
  }

  @post('/delete')
  async delete(ctx) {
    const id = parseInt(ctx.request.body.id, 10);
    ctx.body = await this.postService.softDelete(id);
  }

  @post('/destroy')
  async destroy(ctx) {
    const id = parseInt(ctx.request.body.id, 10);
    ctx.body = await this.postService.destroy(id);
  }
}