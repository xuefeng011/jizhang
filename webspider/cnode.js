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

var i = 0

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
        topics = topics.map(function(topicPair) {
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
                title: $('.topic_full_title').text(),
                href: topicUrl,
                comment1: $('.reply_content .markdown-text').eq(0).text().trim()
            });
        });
        console.log('------------------------ outcomes -------------------------');
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
    async.mapLimit(topicUrls, 5 ,function (topicUrl, callback) {
            concurrentGet(topicUrl, callback);
        });
})