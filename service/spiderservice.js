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

function checkNumber(data) {
	if (!data || data == " ") {
		return 0;
	}

	var result = parseFloat(data)
	if (isNaN(result)) {
		return 0;
	} else {
		return result;
	}

}


function getObj(topicPair) {
	var topicUrl = topicPair[0];
	var topicHtml = topicPair[1];
	var $ = cheerio.load(topicHtml);
	var id = topicUrl.split("/")[4]
	return ({
		"Id": id,
		"SourceId":5,
		"ProductId": id,
		"ProductName": $(".name h1").text().trim(),
		"PicUrl":  $("#_middleImage").attr("src").trim(),
		"Price": checkNumber($(".p-price").text()),
		"InsertDate": new Date(),
		"Updatedate": "",
		"Others": {
			"Url": topicUrl,
			"PicContent": "",
			"Origin": $(".summary_info .info_L .dd").eq(0).text().replace("(*)","").trim(),
			"CommentCnt": checkNumber($(".summary_info .info_R .dd").eq(1).text().replace("条评论","")),
			"SoldCnt": checkNumber($(".summary_info .info_R .dd").eq(0).text()),
			"Weight": $(".p-weight").text().replace("(","").replace(")","").trim(),
			"Unit":$(".p-weight").text().replace("(","").replace(")","").trim(),
			"UnitPrice":$(".sh-price").text().trim(),
			"ScPrice": $(".sc-price").text().trim()
		},
		"Source": {
			"SourceId": 5,
			"SourceName": "食行生鲜",
			"Category1": $("#head_yemei a").eq(1).text().trim(),
			"Category2": $("#head_yemei a").eq(2).text().trim()
		},
		"RelationIds": "String",
		"KeyWords": `食行生鲜`
	});
}


function spiderStart(cnt, jobversion) {
	var topicUrls = [];
	// console.log("[" + jobversion + "]------------------task start-------------------------");

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

			global.JOB.InTasking = false;
			global.JOB.TaskRemark = ('[' + jobversion + ']本次爬虫结果总共' + topics.length + '条 完成时间[' + new Date().toLocaleString() + ']')

			console.log("[" + jobversion + "]=========================== TASK END ===========================");
			// console.log(topics);
			console.log('[' + jobversion + ']本次爬虫结果总共' + topics.length + '条')

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
						var obj = getObj([url, res.text])
						insertMongodb(obj, jobversion)
						ep.emit('crawled', obj);
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

function insertMongodb(item, jobversion) {

	//console.log('[' + jobversion + ']------------------------ DB START -------------------------');

	var TableName = "Products";

	MongoDbHelper.save(TableName, item, function(err, result) {
		if (err) {
			console.log('[' + jobversion + ']------------------------ DB ERROR -------------------------' , err);
		} else {
			console.log('[' + jobversion + ']------------------------ DB SUCCESS -------------------------');
		}
	});
}


module.exports = spiderservice;