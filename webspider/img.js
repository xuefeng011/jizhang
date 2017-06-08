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
// 设置爬虫目标URL
var targetUrl = 'https://cnodejs.org/';


var dir = './images'
// 创建目录图片存储
mkdir(dir, function(err) {
    if(err) {
        console.log(err);
    }
});



var topicUrls = []; 
function getTopicUrls() {
    return new Promise(function(resolve){
        superagent.get(targetUrl)
            .end(function(err, res){
                if (err) {
                    return console.log('error:', err)
                }
                var $ = cheerio.load(res.text);
                $('#topic_list .topic_title').each(function(index, element){

                    if(index<4){
                        var href = url.resolve(targetUrl, $(element).attr('href'));
                        topicUrls.push(href);
                        resolve(topicUrls);
                    }
                })
            });
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
                title: $('.topic_full_title').text(),
                href: topicUrl,
                comment1: $('.reply_content .markdown-text').eq(0).text().trim(),
                imgurl:$('.user_avatar img').attr('src')
            });
        });


        // // 下载图片的使用异步可能会导致没下载完然后图片破损了，这边使用async.mapSeries串行执行
        // async.mapSeries(topics, function (topic, callback) {
        //     // 创建文件流
        //     var img =topic.imgurl
        //     img=img.replace("?v=3&s=120","")
        //     const stream = fs.createWriteStream(dir + '/' + path.basename(img) + '.jpg');
        //     const res = superagent.get(img);
        //     // res.type('jpg')
        //     res.pipe(stream);
        //     console.log(img, '－－保存完成');
        //     callback(null, 'Call back content');
        // });
        var d=new Date()
        var logpath=dir+ '/'+ (d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+''+d.getHours()+''+d.getMinutes()+''+d.getMilliseconds()) +'.txt'
        console.log(logpath)
        fs.writeFile(logpath, JSON.stringify(topics), function(err){  
            if(err)  
                console.log("fail " + err);  
            else  
                console.log("写入文件ok");  
        });  


        console.log('------------------------ END -------------------------');
        console.log(topics);
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