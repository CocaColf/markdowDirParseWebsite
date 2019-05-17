"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const parseTree_1 = require("../common/parseTree");
exports.service = {
    getTree: () => {
        let srcPath = process.cwd();
        return JSON.stringify(parseTree_1.parseTree(srcPath));
    },
    readable: (path) => {
        return new Promise((resolve, reject) => {
            let fileData = '';
            let readable = fs.createReadStream(path);
            readable.on('data', (chunk) => {
                fileData += chunk;
            });
            readable.on('end', () => {
                resolve(fileData);
            });
        });
    }
};
