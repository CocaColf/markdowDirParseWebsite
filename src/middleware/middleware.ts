import * as PATH from 'path';
import * as View from 'koa-views';
import * as Static from 'koa-static';
import * as bodyParse from 'koa-bodyparser';
import * as cors from 'koa-cors';

export let middlewareHandler = (app) => {
    app.use(View(PATH.resolve(__dirname, '../views'), {
        extension: 'html'
    }));
    app.use(Static(PATH.resolve(__dirname, '../views')));

    app.use(bodyParse());

    // 处理跨域
    app.use(cors());
}