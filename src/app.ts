import * as koa from 'koa';
import { middlewareHandler } from './middleware/middleware';
import { routerHandler } from './router/router';
import { copyDirHandler } from './service/handleCopyDir';

export let markdownWebsite = function(): void {
    
    copyDirHandler();

    const app = new koa();
    
    // 中间件
    middlewareHandler(app);

    // 路由
    routerHandler(app);
    
    app.listen(3000);
}