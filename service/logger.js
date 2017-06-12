
var log4js = require('log4js');

log4js.configure({
    appenders: [
        {"type": "console"},   //控制台输出
        {
            type: 'file', //文件输出
            filename: 'logs/sys.log',
            maxLogSize: 1024,
            pattern: '-yyyy-MM-dd.log',
            backups: 3,
            category: 'sys'
        }, {
            "type": "dateFile",                 // 日志文件类型，可以使用日期作为文件名的占位符  
            "filename": "logs/",     // 日志文件名，可以设置相对路径或绝对路径  
            "pattern": "yyyyMM/yyyyMMddhh.log",  // 占位符，紧跟在filename后面  
            "absolute": true,                   // filename是否绝对路径  
            "alwaysIncludePattern": true,       // 文件名是否始终包含占位符  
            "category": "normal"               // 记录器名  
        }
    ],
    replaceConsole: true
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

module.exports.logger = function (name) {
    logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
}