# markdowDirParseWebsite

`把存有markdown文件的文件夹变为web端查看的命令行工具`

**初衷**

+ 自己写的一些本地文件，需要频繁跳转目录去查看

+ 推荐markdown给小伙伴，但小伙伴觉得给别人看要转格式麻烦 

**用法**

+ 初次使用需要：`npm install -g markdown-parse-website` / `yarn global add markdown-parse-website`

+ 在目的文件夹下，执行 `fileShow parse`

+ 浏览器打开 `localhost:3000`

**扩展**

默认主题目前很简陋，可以自己编写主题，接口为:

+ `http://localhost:port/getTree` [method: GET] : 得到所有文件、文件夹的树形列表

+ `http://localhost:port/getFileData` [method: POST, data: 上面的接口返回的被点击的文件目录] : 获取被“编译”的文件内容