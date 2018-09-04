var express = require('express');
var app = express();
var fs = require("fs");
var logger = require('morgan');
var app = express();
var fortune = require('./lib/fortune');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(express.static(__dirname+'/public'));

// app.use(require('body-parser')());



app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');


app.use(logger('dev'));

app.get('/test',function(req,res){
    res.render('404',{Layout:null});
});

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/listUsers100', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
 })

app.get('/headers',function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers )
    {
        s+=name+':'+req.headers[name]+'\n';
    }        
    res.send(s);


});

 app.get('/', function (req, res) {
    // res.type('text/plain');
    // res.send('My Express App');
    res.render('home');
 })

 app.get('/about', function (req, res) {
    //var randomFortune =fortunes[Math.floor(Math.random() * fortunes.length)];

    res.render('about',{fortune:fortune.getFortune});
 })

 app.use(function (req, res,next) {
    res.status(404);
    res.render('404');
 })

 app.use(function (req, res,next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
 })


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})


// var express = require('express');
// var app = express();
// var fs = require("fs");
 
// var bodyParser = require('body-parser');
// var multer  = require('multer');
 
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/tmp/'}).array('image'));
 
// app.get('/index.htm', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.htm" );
// })
 
// app.post('/file_upload', function (req, res) {
 
//    console.log(req.files[0]);  // 上传的文件信息
 
//    var des_file = __dirname + "/" + req.files[0].originalname;
//    fs.readFile( req.files[0].path, function (err, data) {
//         fs.writeFile(des_file, data, function (err) {
//          if( err ){
//               console.log( err );
//          }else{
//                response = {
//                    message:'File uploaded successfully', 
//                    filename:req.files[0].originalname
//               };
//           }
//           console.log( response );
//           res.end( JSON.stringify( response ) );
//        });
//    });
// })
 
// var server = app.listen(8081, function () {
 
//   var host = server.address().address
//   var port = server.address().port
 
//   console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
// })


// var http = require("http");
// var url = require("url");
 
// function start(route) {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");
 
//     route(pathname);
 
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World");
//     response.end();
//   }
 
//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }
 
// exports.start = start;

// var http = require("http");
// var url = require("url");
 
// function start() {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World");
//     response.end();
//   }
 
//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }
 
// exports.start = start;