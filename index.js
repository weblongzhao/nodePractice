var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')
function staticRoot(staticPath,request,response){
    console.log(staticPath)

    console.log(request.url)

    var pathObj = url.parse(request.url,true)
    console.log(pathObj)
    switch(pathObj.pathname){
        case '/getweather':
        var ret
        if(pathObj.query.city =='beijing'){
            console.log('beijing')
            ret={
                city:'beijing',
                weather:'晴天'
            }
        }else {
            ret = {
                city:pathObj.query.city,
                weather:'数据更新中'
            }
        }
        response.end(JSON.stringify(ret))
        break ;
        case '/user':
        response.end(fs.readFileSync(__dirname+'/static/user.txt'))
        break;
        case "/":
           pathObj.pathname += 'index.html'
           var filePath = path.join(staticPath,pathObj.pathname)
           fs.readFile(filePath,function(err,fileContent){
              if(err){
                  console.log('404')
                  response.writeHead(404,'not find')
            response.end('<h1>404 not find</h1>')
        }else {
            response.write(fileContent)
            response.end()
        }
    })
    break;
        default:
            response.end(fs.readFileSync(__dirname+'/static'+pathObj.pathname))
    }


}

console.log(path.join(__dirname,'static'))

var server = http.createServer(function(request,response){
    response.setHeader('content-type','text/html;charset=utf-8')
    staticRoot(path.join(__dirname,'static'),request,response)
})


server.listen(8080)














































