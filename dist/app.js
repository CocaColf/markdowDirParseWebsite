"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa = require("koa");
const middleware_1 = require("./middleware/middleware");
const router_1 = require("./router/router");
const handleCopyDir_1 = require("./service/handleCopyDir");
exports.markdownWebsite = function () {
    handleCopyDir_1.copyDirHandler();
    const app = new koa();
    // 中间件
    middleware_1.middlewareHandler(app);
    // 路由
    router_1.routerHandler(app);
    app.listen(3000);
};
