"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const http = require("http");
// 检测port是否被占用
function probe(port, callback) {
    let server = net.createServer().listen(port);
    let calledOnce = false;
    let timeoutRef = setTimeout(function () {
        calledOnce = true;
        callback(false, port);
    }, 2000);
    server.on('listening', function () {
        clearTimeout(timeoutRef);
        if (server)
            server.close();
        if (!calledOnce) {
            calledOnce = true;
            callback(true, port);
        }
    });
    server.on('error', function (err) {
        clearTimeout(timeoutRef);
        var result = true;
        if (err.code === 'EADDRINUSE')
            result = false;
        if (!calledOnce) {
            calledOnce = true;
            callback(result, port);
        }
    });
}
function server(_port) {
    var pt = _port || __port;
    probe(pt, function (bl, _pt) {
        // 端口被占用 bl 返回false
        // _pt：传入的端口号
        if (bl === true) {
            // ssr(_pt)
            server = http.createServer();
            server = server.listen(parseInt(_pt, 10));
            console.log("\n  Static file server running at" + "\n\n=> http://localhost:" + _pt + '\n');
        }
        else {
            server(_pt + 1);
        }
    });
}
server(3000);
