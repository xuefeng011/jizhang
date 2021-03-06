var express = require('express');
var path = require('path');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// var cluster = require('cluster');
// var numCPUs = require('os').cpus().length;

var routes = require('./routes/index');
var sellect = require('./routes/sellect');
var products = require('./routes/products');
var spider = require('./routes/spider');
var task = require('./routes/task');

var follows = require('./routes/follows');
var account = require('./routes/account');


var MongoDbHelper = require('./service/mongodbhelper');


var TableName = "Account";



// var logger = require('./service/logger').logger('sys');

//log4
// var log4js = require('log4js');

var app = express();



//log4
// log4js.configure({
//   appenders: [
//     { type: 'console' }, //控制台输出
//     {
//       type: 'file', //文件输出
//       filename: 'logs/access.log',
//       maxLogSize: 1024,
//       backups: 3,
//       category: 'normal'
//     }
//   ],
//   replaceConsole: true
// });
// var logger = log4js.getLogger('normal');
// logger.setLevel('INFO');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//log4js
// var log4js = require('log4js');
// log4js.configure({
//     appenders: [
//         {"type": "console", "category": "console"}]   //控制台输出
// });
// var logger = log4js.getLogger('console');
// logger.setLevel('INFO');
// app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));


// module.exports.logger=function(name){
//   var logger = log4js.getLogger(name);
//   logger.setLevel('INFO');
//   return logger;
// }
// app.use(app.router);



app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    // res.send(200);
    res.end()
  } else {


    next();
  }

});


app.use('*', function(req, res, next) {

  var authresult = account.auth(req.baseUrl, req.cookies.ctoken).then(function(result) {
    // console.log(1111111, result)
    // console.log('权限成功')
    next();
  }).catch(function(err) {

    console.log(`权限失败 baseurl=[${req.baseUrl}] ctoken=[${req.cookies.ctoken}] err=[${err}]`)
    res.status(200);
    res.json({
      errorCode: -999,
      errorMessage: "请重新登录",
      datas: []
    });
    res.end();
  });

});

app.use('/', routes);
app.use('/sellect', sellect);
app.use('/products', products);
app.use('/spider', spider);
app.use('/task', task);
app.use('/follows', follows);
app.use('/account', account.router);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      url: req.url || '-'
    });
  });
}



console.log("[Env=PATH_JZ]", (!!process.env && !!process.env.PATH_JZ) ? process.env.PATH_JZ : "none")
console.log("[Env=NEEDLOG4JS]", (!!process.env && !!process.env.NEEDLOG4JS) ? process.env.NEEDLOG4JS : "none")


// console.log(222222222222222, app.get('env'))
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    url: req.url || '-'
  });
});


app.listen(18080);

global.codeVersion = "1.0.7";

// logger.warn(`-----------START port[18080] pid=[${process.pid}] version=[${process.version}] platform=[${process.platform}] env=[${process.env.NODE_ENV}] execPath=[${process.execPath}]-----------`)

// //多线程
// if (cluster.isMaster) {
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
//   console.log(`-----------START port[18080] pid=[${process.pid}] version=[${process.version}] platform=[${process.platform}] env=[${process.env.NODE_ENV}] execPath=[${process.execPath}]-----------`)
//   app.listen(18080);
// }


module.exports = app;