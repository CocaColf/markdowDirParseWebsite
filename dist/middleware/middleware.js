"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PATH = require("path");
const View = require("koa-views");
const Static = require("koa-static");
const bodyParse = require("koa-bodyparser");
const cors = require("koa2-cors");
exports.middlewareHandler = (app) => {
    app.use(View(PATH.resolve(__dirname, '../views'), {
        extension: 'html'
    }));
    app.use(Static(PATH.resolve(__dirname, '../views')));
    app.use(bodyParse());
    // 处理跨域
    app.use(cors());
};
