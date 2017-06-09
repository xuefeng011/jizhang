var superagent = require('superagent');
var cheerio = require('cheerio');



var path = require('path')
var eventproxy = require('eventproxy');
var async = require('async');
var targetUrl = "http://sh.34580.com/p/";


var MongoDbHelper = require('./mongodbhelper');


var spiderservice = {
	start: function(cnt, jobversion) {
		if (!!cnt && !!jobversion) {
			spiderStart(cnt, jobversion)
		} else {
			console.log("spiderStart noparam")
		}
	}
}

function spiderStart(cnt, jobversion) {
	var topicUrls = [];
	console.log("[" + jobversion + "]------------------task start-------------------------");

	function getTopicUrls() {
		return new Promise(function(resolve) {
			//10359
			for (var i = 1; i < cnt; i++) {
				topicUrls.push("http://sh.34580.com/p/" + i);
				resolve(topicUrls);
			}
		});
	};
	getTopicUrls().then(function(topicUrls) {
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
					name: $(".name h1").text(),
					imgurl: $("#_middleImage").attr("src"),
					url: topicUrl
				});
			});


			// //var d=new Date()
			// //var logpath=dir+ '/'+ (d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+''+d.getHours()+''+d.getMinutes()+''+d.getMilliseconds()) +'.json'
			// var logpath = dir + '/' + moment().format('YYYYMMDDHHmmss') + '.json';
			// //console.log(logpath)
			// fs.writeFile(logpath, JSON.stringify(topics), function(err) {
			// 	if (err)
			// 		console.log("fail " + err);
			// 	else
			// 		console.log("写入文件[" + logpath + ".json] 成功");
			// });


			// var id = req.query.Id;
			// var SourceId = req.query.SourceId || 1;

			// var data = {
			// 	"Id": id,
			// 	"SourceId": SourceId,
			// 	"ProductId": id,
			// 	"ProductName": "apple " + id,
			// 	"PicUrl": "",
			// 	"PicContent": "",
			// 	"Price": "",
			// 	"Url": "",
			// 	"RealPrice": Math.random() * 100,
			// 	"Unit": "个",
			// 	"InsertDate": new Date(),
			// 	"Updatedate": ""
			// }

			// MongoDbHelper.save(TableName, data, function(err, result) {
			// 	res.json(result);
			// 	res.end();
			// });


			insertMongodb(topics,jobversion)

			global.JOB.InTasking = false;
			global.JOB.TaskRemark = ('[' + jobversion + ']本次爬虫结果总共' + topics.length + '条 完成时间[' + new Date().toLocaleString() + ']')

			console.log("[" + jobversion + "]=========================== TASK END ===========================");
			// console.log(topics);
			console.log('[' + jobversion + ']本次爬虫结果总共' + topics.length + '条')
				// request.status(200);
				// request.json({
				// 	errorCode: 1,
				// 	errorMessage: "result.text",
				// 	msg: '本次爬虫结果总共' + topics.length + '条',
				// 	datas: topics
				// });
				// request.end()


		});
		var curCount = 0;
		// 设置延时
		function concurrentGet(url, callback) {
			var delay = parseInt((Math.random() * 30000000) % 1000, 10);
			curCount++;
			setTimeout(function() {
				var remark = `[${jobversion}]现在的并发数是${curCount}，正在抓取的是${url}，耗时${delay}毫秒`;
				global.JOB.InTasking = true;
				global.JOB.TaskRemark = remark
				console.log(remark)
				superagent.get(url)
					.end(function(err, res) {
						// console.log('fetch－－' + url + '－－successfully');
						ep.emit('crawled', [url, res.text]);
					});
				curCount--;
				callback(null, url + 'Call back content');
			}, delay);
		}

		// 使用async控制异步抓取    
		// mapLimit(arr, limit, iterator, [callback])
		// 异步回调
		console.log('[' + jobversion + ']=========================== Task START ===========================');
		async.mapLimit(topicUrls, 5, function(topicUrl, callback) {
			concurrentGet(topicUrl, callback);
		});
	})
}

function insertMongodb(results,jobversion) {

	console.log('[' + jobversion + ']------------------------ DB START -------------------------');
	var data = []


	// price: $(".p-price").text(),
	// name: $(".name h1").text(),
	// imgurl: $("#_middleImage").attr("src"),
	// url: topicUrl


	for (var i = 1; i < results.length; i++) {
		data.push({
			"Id": i,
			"SourceId": 4,
			"ProductId": i,
			"ProductName": results[i].name,
			"PicUrl": results[i].imgurl,
			"PicContent": "",
			"Price": results[i].price,
			"Url": results[i].url,
			"RealPrice": results[i].price,
			"Unit": "个",
			"InsertDate": new Date(),
			"Updatedate": ""
		})
	}

	function saved() {
		var TableName = "Products";
		return new Promise(function(resolve) {
			data.map(function(item) {
				MongoDbHelper.save(TableName, item, function(err, result) {
					if (err) {
						reject("error");
					} else {
						resolve(result);
					}
				});
			})
		});
	};


	saved().then(function(data, item) {
		console.log('[' + jobversion + ']------------------------ DB END -------------------------');	
	})


}


module.exports = spiderservice;