import * as OS from 'os';
import * as PATH from 'path';

import { service } from '../service/index';
import { dstPath } from '../service/handleCopyDir';

export let Controller = {
    index: async (ctx, next) => {
        await ctx.render('index');
    
        await next();
    },

    getTree: async (ctx, next) => {
        // TODO: 这里返回的数据结构应该有多种，毕竟不同的主题适配的数据不一样
        let treeData = service.getTree();
    
        ctx.body = treeData;
    
        await next();
    }, 

    getFileData: async (ctx, next) => {
        let srcPath = process.cwd();

        // 文件路径 eg: ../md/test/1.md
        let filePath: string = parsePath(ctx.request.body.path);
        
        // 文件名  eg: 1.html
        let fileName = `${PATH.basename(filePath).split('.')[0]}.html`;
    
        // 文件路径根据系统做转换
        srcPath = parsePath(srcPath);
    
        // eg: /test
        let dirPath = '';
        dirPath = PATH.dirname(PATH.relative(srcPath, filePath));
        
        // 文件在“编译”文件夹dist下的路径   eg: ../dist/test/1.html
        let newFilePath = PATH.join(dstPath, dirPath, fileName);
    
        await service.readable(newFilePath).then(data => {
            ctx.body = data; 
        })
        
        await next();
    },

    

}
// 根据平台来转换路径
function parsePath(path) {
    let newPath = '';
    let platForm = OS.platform();

    if(platForm === 'win32') {
        newPath = path.split('/').join('\\');
    } else {
        newPath = path.split('\\').join('/');
    }

    return newPath;
}