/* 
 * 拷贝文件夹到另一个目录
 */

import * as fs from 'fs';
import { transMarked } from './transMarked';

interface dirFunc {
    (src: string, dst: string): void
}

let copyDir: dirFunc;

copyDir = function(srcPath: string, dstPath: string) {

    /* 
     * 1.把源文件夹下的文件和目录拷贝到目的文件夹
     * 2.如果是文件则直接拷贝；如果是文件夹则递归调用
     */
    let _copyDir: dirFunc;
    _copyDir = function(_srcPath: string, _dstPath: string) {
        fs.readdir(_srcPath, (err, files) => {
            if(err) {
                throw err;
            } else {
                files.forEach((item, index, arr) => {
                    let _src: string = `${_srcPath}/${item}`,
                        _dst:string;

                    fs.stat(_src, (err, stats) => {
                        if(err) {
                            throw err;
                        } else {
                            if(stats.isFile()) {
                                // 如果是文件，则在转移到目的目录时修改后缀名为html
                                let splitedFileName = item.split('.');
                                splitedFileName[1] = 'html';
                                _dst = `${_dstPath}/${splitedFileName.join('.')}`;

                                transMarked(_src, _dst);
                            } else if(stats.isDirectory()){
                                _dst = `${_dstPath}/${item}`;

                                existAndCopy(_src, _dst, _copyDir);
                            }
                        }
                    })
                })
            }
        })
    }

    // 检查目的目录是否有待复制文件夹，如果没有则创建
    let existAndCopy = function(_src: string, _dst: string, callback: dirFunc) {
        fs.stat(_dst, (err, stats) => {
            // 不存在，创建
            if (err) {
                fs.mkdir(_dst, (err) => {
                    if (err) {
                        throw err;
                    }
                });
    
            }
            callback(_src, _dst);
        })
    }

    existAndCopy(srcPath, dstPath, _copyDir);
}

export {
    copyDir
}