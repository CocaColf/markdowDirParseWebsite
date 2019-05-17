"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const PATH = require("path");
exports.parseTree = function (srcPath) {
    const name = PATH.basename(srcPath);
    const path = srcPath;
    let item = {
        path: path,
        text: name,
        size: 0,
        type: '',
        children: [],
        icon: ''
    };
    let stats = fs.statSync(srcPath);
    if (stats.isFile()) {
        item.size = stats.size;
        item.type = 'file';
        item.icon = 'jstree-file';
    }
    else if (stats.isDirectory()) {
        let files = fs.readdirSync(srcPath);
        item.children = files.map(child => exports.parseTree(PATH.join(srcPath, child)));
        item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);
        item.type = 'directory';
    }
    return item;
};
