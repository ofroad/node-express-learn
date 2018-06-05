var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var userinfo = require('./routes/userinfo');
var Add = require('./routes/add');
var Update = require('./routes/update');
var find = require('./routes/find');
var jwt = require('./routes/jwt');

var fs = require('fs');
var path = require('path');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(logger('combined', {stream: accessLogStream}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/v1', userinfo);
app.use('/v2', find);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
mongoose.connect('mongodb://localhost:27017/test001',function (err) {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
    }
});

/*
__dirname 表示当前文件所在的目录的绝对路径
__filename 表示当前文件的绝对路径
module.filename ==== __filename 等价
process.cwd() 返回运行当前脚本的工作目录的路径
process.chdir() 改变工作目录
*/
console.log(__dirname);
console.log(__filename);
console.log(module.filename===__filename);
console.log(process.cwd());


module.exports = app;
