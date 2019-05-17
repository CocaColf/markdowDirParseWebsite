"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PATH = require("path");
const copyDir_1 = require("../common/copyDir");
let srcPath = process.cwd();
exports.dstPath = PATH.join(PATH.dirname(srcPath), 'dist');
exports.copyDirHandler = () => {
    copyDir_1.copyDir(srcPath, exports.dstPath);
};
