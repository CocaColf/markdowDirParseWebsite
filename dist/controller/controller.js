"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const OS = require("os");
const PATH = require("path");
const index_1 = require("../service/index");
const handleCopyDir_1 = require("../service/handleCopyDir");
exports.Controller = {
    index: (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        yield ctx.render('index');
        yield next();
    }),
    getTree: (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        // TODO: 这里返回的数据结构应该有多种，毕竟不同的主题适配的数据不一样
        let treeData = index_1.service.getTree();
        ctx.body = treeData;
        yield next();
    }),
    getFileData: (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        let srcPath = process.cwd();
        // 文件路径 eg: ../md/test/1.md
        let filePath = parsePath(ctx.request.body.path);
        // 文件名  eg: 1.html
        let fileName = `${PATH.basename(filePath).split('.')[0]}.html`;
        // 文件路径根据系统做转换
        srcPath = parsePath(srcPath);
        // eg: /test
        let dirPath = '';
        dirPath = PATH.dirname(PATH.relative(srcPath, filePath));
        // 文件在“编译”文件夹dist下的路径   eg: ../dist/test/1.html
        let newFilePath = PATH.join(handleCopyDir_1.dstPath, dirPath, fileName);
        yield index_1.service.readable(newFilePath).then(data => {
            ctx.body = data;
        });
        yield next();
    }),
};
// 根据平台来转换路径
function parsePath(path) {
    let newPath = '';
    let platForm = OS.platform();
    if (platForm === 'win32') {
        newPath = path.split('/').join('\\');
    }
    else {
        newPath = path.split('\\').join('/');
    }
    return newPath;
}
