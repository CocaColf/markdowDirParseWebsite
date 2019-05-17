"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller_1 = require("../controller/controller");
const router = new Router();
exports.routerHandler = app => {
    router.get('/', controller_1.Controller.index);
    router.get('/getTree', controller_1.Controller.getTree);
    router.post('/getFileData', controller_1.Controller.getFileData);
    app.use(router.routes())
        .use(router.allowedMethods());
};
