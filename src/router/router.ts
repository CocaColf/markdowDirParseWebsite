import * as Router from 'koa-router';
import { Controller } from '../controller/controller';

const router = new Router();

export let routerHandler = app => {
    router.get('/', Controller.index);
    router.get('/getTree', Controller.getTree);
    router.post('/getFileData', Controller.getFileData);

    app.use(router.routes())
        .use(router.allowedMethods());
}


