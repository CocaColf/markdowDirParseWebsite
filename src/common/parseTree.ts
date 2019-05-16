import * as fs from 'fs';
import * as PATH from 'path';

/* 
 * 把源文件结构转为树状结构
 */
interface treeItem {
    path: string,
    text: string,
    size: number,
    type: string,
    children: Array<any>,
    icon: string
}

export const parseTree = function (srcPath: string): object {
    const name = PATH.basename(srcPath);
    const path = srcPath;
    let item: treeItem = {
        path: path,
        text: name,
        size: 0,
        type: '',
        children: [],
        icon: ''
    }

    let stats = fs.statSync(srcPath);

    if(stats.isFile()) {
        item.size = stats.size;
        item.type = 'file';
        item.icon = 'jstree-file';
    } else if(stats.isDirectory()) {
        let files = fs.readdirSync(srcPath);
        item.children = <Array<object>>files.map(child => parseTree(PATH.join(srcPath, child)));
        item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);
        item.type = 'directory';
    }

    return item;
 }
