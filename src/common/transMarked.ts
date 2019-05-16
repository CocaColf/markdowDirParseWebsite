import fs = require('fs');
import * as Marked from 'marked';
import * as highlight from 'highlight.js';

Marked.setOptions({
    // renderer: new Marked.Renderer(),
    highlight: function(code) {
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

/* 
 * 把文件夹下的markdown转移到另一个文件夹并对markdown文件进行转换
 */
interface dirFunc {
    (src: string, dst: string): void
}

let transMarked: dirFunc;
transMarked = function(_src: string, _dst: string): void {
    let fileData: string = '';
    
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
}

export { transMarked }

// test
// transMarked('./testInput/1.md', './testOutput/1.md');

