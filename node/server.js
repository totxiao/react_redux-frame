/**
 * @author totlin
 * @data 2018/9/27 10:11
 */

var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function (req, res) {

    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();

}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');