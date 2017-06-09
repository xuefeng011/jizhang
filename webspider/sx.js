// node自带的模块
const path = require('path')
const url = require('url');
const fs = require('fs')
// npm安装的依赖库
const superagent = require('superagent');
const cheerio = require('cheerio');
const eventproxy = require('eventproxy');
const async = require('async');
const mkdir = require('mkdirp')


const moment = require('moment')

// 设置爬虫目标URL
var targetUrl = "http://sh.34580.com/p/";


var dir = './files/sx'
// 创建目录图片存储
mkdir(dir, function(err) {
    if(err) {
        console.log(err);
    }
});



var topicUrls = []; 
function getTopicUrls() {
    return new Promise(function(resolve){
            //10359
        for(var i=1;i<10;i++){
            topicUrls.push(targetUrl+i);
            resolve(topicUrls);
        }
    });
};
getTopicUrls().then(function(topicUrls){
    // console.log('-------------',topicUrls)
    var ep = new eventproxy();
    ep.after('crawled', topicUrls.length, function(topics) {
        // var imgUrls = []
        topics = topics.map(function(topicPair) {
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);

            // imgUrls.push($('.user_avatar img').attr('src'));

            return ({
                price: $(".p-price").text(),
                name:$(".name h1").text(),
                imgurl:$("#_middleImage").attr("src"),
                url:topicUrl
            });
        });


        //var d=new Date()
        //var logpath=dir+ '/'+ (d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+''+d.getHours()+''+d.getMinutes()+''+d.getMilliseconds()) +'.json'
        var logpath =dir+ '/'+ moment().format('YYYYMMDDHHmmss')+'.json';
        //console.log(logpath)
        fs.writeFile(logpath, JSON.stringify(topics), function(err){  
            if(err)  
                console.log("fail " + err);  
            else  
                console.log("写入文件["+logpath+".json] 成功");  
        });  


        console.log('------------------------ END -------------------------');
        // console.log(topics);
        console.log('本次爬虫结果总共' + topics.length + '条')

    });
    var curCount = 0;
    // 设置延时
    function concurrentGet(url, callback) {
        var delay = parseInt((Math.random() * 30000000) % 1000, 10);
        curCount++;
        setTimeout(function() {
            console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');  
            superagent.get(url)
                .end(function(err, res){
                    console.log('fetch－－' + url + '－－successfully');
                    ep.emit('crawled', [url, res.text]);
                });
            curCount--;
            callback(null,url +'Call back content');
        }, delay);
    }

    // 使用async控制异步抓取    
    // mapLimit(arr, limit, iterator, [callback])
    // 异步回调
    console.log('------------------------ START -------------------------');
    async.mapLimit(topicUrls, 5 ,function (topicUrl, callback) {
            concurrentGet(topicUrl, callback);
        });
})