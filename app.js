var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");

app.set('views',__dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
    console.log('Express server listen on port 3000');
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: "!@#!@#",
    resave : false,
    saveUninitialized : true
}));

var router = require('./router/index')(app,fs);
/*
app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(3000, function(){
    console.log('Express server listen on port 3000');
});
*/

/*
*
아래 코드는 라우팅까지 포함
// var http = require('http');
// express 서버 포트설정
app.set('port',process.env.PORT || 8080);

// 서버 생성
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listen on port' + app.get('port'));
});

// 라우팅 모듈 선언
var indexRouter = require('./routes/index');

// request 요청 URL과 처리 로직 선언한 라우팅 모듈 매핑
app.use('/', indexRouter);
*/