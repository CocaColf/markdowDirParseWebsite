#! /usr/bin/env node 
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const app_1 = require("./app");
program
    //允许所有的未知命令
    .allowUnknownOption()
    .version('1.0.0')
    .usage('fileShow <cmd>')
    .command('parse')
    .description('把当前路径下存有markdown的文件夹转为类似gitbook的网站')
    .action((par) => {
    app_1.markdownWebsite();
});
//如果没有任何命令行参数 打印出help和展示所有的命令行
if (!process.argv[2]) {
    program.help();
}
program.parse(process.argv);
