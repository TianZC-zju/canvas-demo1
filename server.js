var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`
            <!doctype html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>canvas 画板</title>
                <link href="deom.css" rel="stylesheet">
            </head>
            <body>
                <canvas id="canvas" width="300px" height="300px"></canvas>
                <script src="javascript.js"></script>
            </body>
            </html>
        `)
        response.end()
    } else if (path === '/x') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(`
            *{margin:0;padding: 0;box-sizing:border-box;}
            #canvas{
                display: block;
            }
        `)
        response.end()
    } else if (path === '/y') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(`
                    var canvas = document.getElementById("canvas");
                    canvas.width = document.documentElement.clientWidth
                    canvas.height = document.documentElement.clientHeight
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath()
                    ctx.lineWidth = 5
                    ctx.lineCap = 'round'
                    let isPainting = false
                    let isTouchDevice = 'ontouchstart' in document.documentElement;
                    let pointPre = {x:0,y:0}
                    if(isTouchDevice){
                        canvas.ontouchstart = ev => {
                            pointPre.x=ev.touches[0].clientX
                            pointPre.y=ev.touches[0].clientY
                        }
                        canvas.ontouchmove = ev => {
                            ctx.moveTo(pointPre.x, pointPre.y)
                            pointPre.x=ev.touches[0].clientX
                            pointPre.y=ev.touches[0].clientY
                            ctx.lineTo(pointPre.x, pointPre.y)
                            ctx.stroke()
                        }
                    
                    }else{
                        canvas.onmousedown =(e)=>{
                            isPainting = true
                            pointPre.x=e.clientX
                            pointPre.y=e.clientY
                        }
                        canvas.onmouseup =()=>{
                            isPainting = false
                        }
                        canvas.onmousemove = (e) =>{
                            if(isPainting){
                                ctx.moveTo(pointPre.x, pointPre.y)
                                pointPre.x=e.clientX
                                pointPre.y=e.clientY
                                ctx.lineTo(pointPre.x, pointPre.y)
                                ctx.stroke()
                            }
                    
                        }
                    }
                    var draw = (x, y)=>{
                        ctx.beginPath();
                        ctx.arc(x, y, 10, 0, 2 * Math.PI);
                        ctx.fill();
                    }
        `)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)