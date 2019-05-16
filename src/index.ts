#! /usr/bin/env node 
'use strict';
import * as program from 'commander';
import { markdownWebsite } from './app';

program
  //允许所有的未知命令
  .allowUnknownOption()
  .version('1.0.0')
  .usage('mdShow <cmd>')
  .command('parse')
  .description('把当前路径下存有markdown的文件夹转为类似gitbook的网站')
  .action((par) => {
    markdownWebsite();
  });

//如果没有任何命令行参数 打印出help和展示所有的命令行
if(!process.argv[2]) {
  program.help();
}
program.parse(process.argv);