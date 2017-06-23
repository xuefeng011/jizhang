var express = require('express');
var router = express.Router();

var MongoDbHelper = require('../service/mongodbhelper');


var TableName = "Follows";


var superagent = require('superagent');

var _ = require('underscore')

var logger = require('../service/logger').logger('normal');

Object.extend = function(destination, source) { // 一个静态方法表示继承, 目标对象将拥有源对象的所有属性和方法
	for (var property in source) {
		var tempdata = source[property]
		if (!isNaN(Number(tempdata))) {
			destination[property] = Number(tempdata)
		} else {
			destination[property] = tempdata

		}
	}
	return destination; // 返回扩展后的对象
}



router.get('/', function(req, res) {
	res.status(200);
	logger.info("logger.info");
	console.log("console.log");
	res.json("test");
	res.end();
});


router.get('/get', function(req, res) {
	res.status(200);

	// console.log('get', req.query)

	MongoDbHelper.count(TableName, {}, function(err, cnt) {
		MongoDbHelper.find(TableName, null, null, function(err, result) {
			if (err) {
				res.json({
					errorCode: -2,
					errorMessage: err,
					count: cnt,
					datas: []
				});
			} else {
				res.json({
					errorCode: 1,
					errorMessage: "成功",
					count: cnt,
					datas: result,

				});
			}
		});
	});
});



router.get('/getbygroup', function(req, res) {
	res.status(200);
	MongoDbHelper.count(TableName, {}, function(err, cnt) {
		MongoDbHelper.find(TableName, null, null, function(err, result) {
			if (err) {
				res.json({
					errorCode: -2,
					errorMessage: err,
					count: cnt,
					datas: []
				});
			} else {
				res.json({
					errorCode: 1,
					errorMessage: "成功",
					count: cnt,
					datas: DataByGroup(result),

				});
			}
		});
	});
});


router.get('/removeall', function(req, res) {
	res.status(200);
	MongoDbHelper.remove(TableName, {}, function(err, result) {
		if (err) {
			res.json({
				errorCode: -2,
				errorMessage: err
			});
		} else {
			res.json({
				errorCode: 1,
				errorMessage: "成功",
				datas: result
			});
		}
	});
});

router.get('/getall', function(req, res) {
	res.status(200);
	// res.append("Access-Control-Allow-Origin", "*");

	var pagesize = Number(req.query.pagesize || '3');
	var page = Number(req.query.pageindex || '1');

	var _sort = {};

	var options = {
		sort: Object.extend(_sort, req.query.options || {}),
		skip: pagesize * (page - 1) < 0 ? 0 : pagesize * (page - 1),
		limit: pagesize < 0 || pagesize > 100 ? 10 : pagesize
	};

	// Object.extend(options, req.query.options || {});

	var conditions = req.query.conditions || {};

	logger.warn("conditions", options, conditions)

	// console.log(options)
	MongoDbHelper.count(TableName, conditions, function(err, cnt) {
		MongoDbHelper.where(TableName, conditions, options, function(err, result) {
			if (err) {
				res.json({
					errorCode: -2,
					errorMessage: err,
					TotalCount: cnt || 0,
					CurrCount: 0,
					Datas: []
				});
			} else {
				res.json({
					errorCode: 1,
					errorMessage: "成功",
					TotalCount: cnt,
					CurrCount: result.length,
					Datas: result
				});
			}
		});

	})

});

router.get('/insertOrUpdate', function(req, res) {
	res.status(200);

	var _ID = req.query._id || '';
	var _FollowId = parseInt(req.query.FollowId || 0);
	var conditions = {
		"_id": _ID
	};


	// console.log("req.query",req.query)

	MongoDbHelper.find(TableName, !!_ID ? conditions : null, null, function(finderr, findresult) {
		if (finderr) {
			res.json({
				errorCode: -3,
				errorMessage: finderr
			});
			res.end();
			return;
		}
		// console.log("find",findresult)

		if (!!_ID) {
			data = findresult[0] || {};

			Object.extend(data, req.query || {}),
				data["Updatedate"] = new Date();

			MongoDbHelper.update(TableName, conditions, data, function(updateerr, updateresult) {
				if (updateerr) {
					res.json({
						errorCode: -1,
						errorMessage: "更新失败" + updateerr
					});
					res.end();
				} else {
					res.json({
						errorCode: 1,
						errorMessage: "更新成功",
						updateresult: updateresult,
						datas: data
					});
					res.end();
				}
			});

		} else {


			var maxitem = _.sortBy(findresult, function(item) {
				return -item['FollowId']
			})

			var maxfollowid = !maxitem || maxitem.length <= 0 ? 1 : parseInt(maxitem[0]["FollowId"]) + 1;

			// console.log("findresult max",maxitem[0], maxfollowid)
			data = {
				"FollowId": _FollowId > 0 ? _FollowId : maxfollowid,
				"Name": req.query.Name || "",
				"SourceId": parseInt(req.query.SourceId || 5),
				"SourceName": req.query.SourceName || '-',
				"Price": parseFloat(req.query.Price || 0.0),
				"SourceProductNo": req.query.SourceProductNo || '-',
				"InsertUser":  req.query.InsertUser || '-',
				"Unit": req.query.Unit || '-',
				"InsertDate": new Date((req.query.InsertDate || new Date())),
				"Updatedate": new Date((req.query.Updatedate || new Date()))
			};

			MongoDbHelper.save(TableName, data, function(saveerr, saveresult) {
				if (saveerr) {
					res.json({
						errorCode: -5,
						errorMessage: "新增失败" + saveerr
					});
					res.end();
				} else {
					res.json({
						errorCode: 1,
						errorMessage: "新增成功",
						datas: saveresult
					});
					res.end();
				}
			});
		}
	});

});


function DataByGroup(_datas) {

	var groupbyfollowids = _.groupBy(_datas, 'FollowId')

	var tempresult = [];
	_.each(groupbyfollowids, function(item) {

		var sorts = _.sortBy(item, function(item){ return -(new Date(item['InsertDate']))});

		var last = sorts[0]
		var lasttwo = sorts.length <= 1 ? last : sorts[1]

		var change = parseFloat(last["Price"] - lasttwo["Price"]).toFixed(2);
		var changetype = 0;
		if (change > 0) {
			changetype = 1;
		} else if (change < 0) {
			changetype = -1;
		} else {
			changetype = 0;
		}

		tempresult.push({
			"Name": _.first(item)["Name"],
			"FollowId": _.first(item)["FollowId"],
			"Unit": _.first(item)["Unit"],
			"Price": last["Price"],
			"ChangeType":changetype,
			"Change":change,
			"MinPrice": _.min(item, 'Price')["Price"],
			"MaxPrice": _.max(item, 'Price')["Price"],
			"InsertDate": last["InsertDate"],
			"Datas": sorts
		})

	})
	return tempresult;

}



module.exports = router;