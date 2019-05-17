"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Marked = require("marked");
const highlight = require("highlight.js");
Marked.setOptions({
    // renderer: new Marked.Renderer(),
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});
let transMarked;
exports.transMarked = transMarked;
exports.transMarked = transMarked = function (_src, _dst) {
    let fileData = '';
    // 创建读取流
    let readable = fs.createReadStream(_src);
    // 创建写入流
    let writeable = fs.createWriteStream(_dst);
    readable.on('data', (chunk) => {
        fileData += chunk;
    });
    readable.on('end', () => {
        writeable.write(Marked.parse(fileData));
    });
};
// test
// transMarked('./testInput/1.md', './testOutput/1.md');
