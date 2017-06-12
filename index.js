var express = require('express');
var path = require('path');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// var cluster = require('cluster');
// var numCPUs = require('os').cpus().length;

var routes = require('./routes/index');
var api = require('./routes/api');
var sellect = require('./routes/sellect');
var products = require('./routes/products');
var spider = require('./routes/spider');
var task = require('./routes/task');


var app = express();

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

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);

  } else {
    next();
  }

});

app.use('/', routes);
app.use('/api', api);
app.use('/sellect', sellect);
app.use('/products', products);
app.use('/spider', spider);
app.use('/task', task);

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

global.codeVersion = "1.0.1";

console.log(`-----------START port[18080] pid=[${process.pid}] version=[${process.version}] platform=[${process.platform}] env=[${process.env.NODE_ENV}] execPath=[${process.execPath}]-----------`)

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