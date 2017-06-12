var superagent = require('superagent');
var cheerio = require('cheerio');



var path = require('path')
var eventproxy = require('eventproxy');
var async = require('async');
var targetUrl = "http://sh.34580.com/p/";


var MongoDbHelper = require('./mongodbhelper');


var spiderservice = {
	start: function(cnt, jobversion, sourcetype) {
		if (!!cnt && !!jobversion) {
			spiderStart(parseInt(cnt), jobversion, parseInt(sourcetype))
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

function getText(data) {
	if (!data || data.length < 0) {
		return "";
	} else {
		return data.text().trim();
	}

}

function getObj(topicPair, _sourceType) {
	var topicUrl = topicPair[0];
	var topicHtml = topicPair[1];
	var $ = cheerio.load(topicHtml);
	var id = 0;
	var result = {}
	switch (_sourceType) {
		case 5:
			id = topicUrl.split("/")[4]
			try {
				if (!$("#_middleImage") || $("#_middleImage").length <= 0) {
					return null;
				}
				result = {
					"Id": id,
					"SourceId": 5,
					"ProductId": id,
					"ProductName": getText($(".name h1")),
					"PicUrl": $("#_middleImage").attr("src").trim(),
					"Price": checkNumber(getText($(".p-price"))),
					"Weight": getText($(".p-weight")).replace("(", "").replace(")", "").trim(),
					"InsertDate": new Date(),
					"Updatedate": "",
					"Others": {
						"Url": topicUrl,
						"PicContent": "",
						"Origin": getText($(".summary_info .info_L .dd").eq(0)).replace("(*)", "").trim(),
						"CommentCnt": checkNumber(getText($(".summary_info .info_R .dd").eq(1)).replace("条评论", "")),
						"SoldCnt": checkNumber(getText($(".summary_info .info_R .dd").eq(0))),
						"Unit": getText($(".p-weight")).replace("(", "").replace(")", "").trim(),
						"UnitPrice": getText($(".sh-price")).trim(),
						"ScPrice": getText($(".sc-price")).trim()
					},
					"Source": {
						"SourceId": 5,
						"SourceName": "食行生鲜",
						"Category1": getText($("#head_yemei a").eq(1)).trim(),
						"Category2": getText($("#head_yemei a").eq(2)).trim()
					},
					"RelationIds": "",
					"KeyWords": `食行生鲜`,
					"Version": 0
				};
			} catch (e) {
				console.log(`[${topicUrl}]  error [${e}]`)
				result = null;
			}
			break;
		case 6:
			id = topicUrl.split("/")[4].replace(".html", "")
			try {
				if (!$(".pic-preview .picList li img") || $(".pic-preview .picList li img").length <= 0) {
					return null;
				}
				result = {
					"Id": id,
					"SourceId": 6,
					"ProductId": id,
					"ProductName": getText($(".summary-name h1")),
					"PicUrl": $(".pic-preview .picList li img").eq(0).length > 0 ? $(".pic-preview .picList li img").eq(0).attr("src") : "",
					"Price": checkNumber(getText($(".summary-price .pro-price strong"))),
					"Weight": "",
					"InsertDate": new Date(),
					"Updatedate": "",
					"Others": {
						"Url": topicUrl,
						"PicContent": "",
						"Origin": $(".summary_info .info_L .dd").eq(0).text().replace("(*)", "").trim(),
						"CommentCnt": checkNumber(getText($("#pllabel")).replace("(评论数", "").replace(")", "")),
						"SoldCnt": 0,
						"Unit": getText($(".summary-other .selected span").eq(1)),
						"UnitPrice": getText($(".summary-other .selected span").eq(0)),
						"ScPrice": getText($(".summary-other .selected span"))
					},
					"Source": {
						"SourceId": 6,
						"SourceName": "易果生鲜",
						"Category1": getText($(".crumbs a").eq(1)),
						"Category2": getText($(".crumbs a").eq(2))
					},
					"RelationIds": "",
					"KeyWords": `易果生鲜`,
					"Version": 0
				};
			} catch (e) {
				console.log(`[${topicUrl}]  error [${e}]`)
				result = null;
			}
			break;
	}
	return result;
}


function spiderStart(cnt, jobversion, sourceType) {
	var topicUrls = [];

	var st = 0;
	var et = st + cnt;
	var url = "";
	// console.log(1111111111111111111,cnt, jobversion, sourceType)
	switch (sourceType) {
		case 5:
		case '5':
			st = 0;
			et = st + cnt;
			url = "http://sh.34580.com/p/#index#";
			break;
		case 6:
		case '6':
			st = 62756;
			et = st + cnt;
			url = "http://www.yiguo.com/product/#index#.html";
			break;

	}

	function getTopicUrls() {
		return new Promise(function(resolve) {
			for (var i = st; i < et; i++) {
				topicUrls.push(url.replace("#index#", i));
				resolve(topicUrls);
			}
		});
	};
	getTopicUrls().then(function(topicUrls) {
		// console.log('-------------',topicUrls)
		var ep = new eventproxy();
		ep.after('crawled', topicUrls.length, function(topics) {

			global.JOB.InTasking = false;
			global.JOB.TaskRemark = (`[${jobversion}]本次爬虫结果总共${topics.length}条 完成时间[${new Date().toLocaleString()}]`)
			console.log("[" + jobversion + "]=========================== TASK END ===========================");
			global.enddate = new Date();

			var used = parseInt((global.enddate.getTime() - global.startdate.getTime()) / 1000, 10);
			console.log(`[${jobversion}]本次爬虫结果总共${topics.length}条  耗时=[${used}]秒`)

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
						var obj = null
						if (err || (typeof res) == "undefined" || !res.text) {
							console.log(1111111111111111,err)
							obj = null
							ep.emit('crawled', obj);
						} else {
							obj = getObj([url, res.text], sourceType)
							insertMongodb(obj, jobversion, sourceType, url)
							ep.emit('crawled', obj);
						}
					});
				curCount--;
				callback(null, url + 'Call back content');
			}, delay);
		}

		// 使用async控制异步抓取    
		// mapLimit(arr, limit, iterator, [callback])
		// 异步回调
		console.log('[' + jobversion + ']=========================== Task START ===========================');
		global.startdate = new Date();
		async.mapLimit(topicUrls, 50, function(topicUrl, callback) {
			concurrentGet(topicUrl, callback);
		});
	})
}

function insertMongodb(item, jobversion, url) {
	var url = "";
	if (!!process.env && !!process.env.NODE_ENV && process.env.NODE_ENV === 'dev') {
		url = "http://localhost:18080/products/insert";
	} else {
		url = "https://gougoustar.duapp.com/products/insert"
	}
	if (item == null) {
		console.log('[' + jobversion + ']------- DB NONE -------', url);
		return;
	}

	superagent.get(url)
		.query(item)
		.end(function(err, result) {
			if (err) {
				console.log('[' + jobversion + ']------- DB ERROR -------', err, url);
			} else {
				console.log('[' + jobversion + ']------------------ DB SUCCESS -------', url);
			}
		});
}


module.exports = spiderservice;