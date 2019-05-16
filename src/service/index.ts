import * as fs from 'fs';

import { parseTree } from '../common/parseTree';

export let service = {
    getTree: () => {
        let srcPath = process.cwd();
        return JSON.stringify(parseTree(srcPath));
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
}
