var express = require('express');
var router = express.Router();

var MongoDbHelper = require('../service/mongodbhelper');


var TableName = "Products";


var superagent = require('superagent');


var logger = require('../service/logger').logger('normal');

Object.extend = function (destination, source) { // 一个静态方法表示继承, 目标对象将拥有源对象的所有属性和方法
	for (var property in source) {
		destination[property] = parseInt(source[property],10);   // 利用动态语言的特性, 通过赋值动态添加属性与方法
	}
	return destination;   // 返回扩展后的对象
}



router.get('/', function (req, res) {
	res.status(200);
	logger.info("logger.info");
	console.log("console.log");
	res.json("test");
	res.end();
});


router.get('/get', function (req, res) {
	res.status(200);

	console.log('get', req.query)

	MongoDbHelper.count(TableName, {}, function (err, cnt) {
		MongoDbHelper.find(TableName, null, null, function (err, result) {
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

router.get('/removeall', function (req, res) {
	res.status(200);
	MongoDbHelper.remove(TableName, {}, function (err, result) {
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

router.get('/getall', function (req, res) {
	res.status(200);
	// res.append("Access-Control-Allow-Origin", "*");

	var pagesize = Number(req.query.pagesize || '3');
	var page = Number(req.query.pageindex || '1');
	// var sortField = req.query.sortField || 'Id';
	// var sortOrder = Number(req.query.sortOrder || '-1') > 0 ? 1 : -1;

	// var _sort = {}

	// switch (sortField) {
	// 	case "Id":
	// 		_sort = {
	// 			"Id": sortOrder
	// 		};
	// 		break;
	// 	case "SourceId":
	// 		_sort = {
	// 			"SourceId": sortOrder
	// 		};
	// 		break;
	// 	case "ProductId":
	// 		_sort = {
	// 			"ProductId": sortOrder
	// 		};
	// 		break;
	// 	case "ProductName":
	// 		_sort = {
	// 			"ProductName": sortOrder
	// 		};
	// 		break;
	// 	case "PicUrl":
	// 		_sort = {
	// 			"StPicUrlring": sortOrder
	// 		};
	// 		break;
	// 	case "PicContent":
	// 		_sort = {
	// 			"PicContent": sortOrder
	// 		};
	// 		break;
	// 	case "Price":
	// 		_sort = {
	// 			"Price": sortOrder
	// 		};
	// 		break;
	// 	case "Url":
	// 		_sort = {
	// 			"Url": sortOrder
	// 		};
	// 		break;
	// 	case "RealPrice":
	// 		_sort = {
	// 			"RealPrice": sortOrder
	// 		};
	// 		break;
	// 	case "Unit":
	// 		_sort = {
	// 			"Unit": sortOrder
	// 		};
	// 		break;
	// 	case "InsertDate":
	// 		_sort = {
	// 			"InsertDate": sortOrder
	// 		};
	// 		break;
	// 	case "Updatedate":
	// 		_sort = {
	// 			"Updatedate": sortOrder
	// 		};
	// 		break;
	// }

	//username:{$in:["延思","三"]}
	//Id: {$lt: 50}

	// var SourceId = req.query.SourceId || [];
	// var Unit = req.query.Unit || [];
	// var ProductId = req.query.ProductId || [];

	// var conditions = {};

	// if (SourceId.length > 0) conditions.SourceId = SourceId;
	// if (Unit.length > 0) conditions.Unit = Unit;
	// if (ProductId.length > 0) conditions.ProductId = ProductId;

	var _sort={};

	var options = {
		sort: Object.extend(_sort, req.query.options || {}),
		skip: pagesize * (page - 1) < 0 ? 0 : pagesize * (page - 1),
		limit: pagesize < 0 || pagesize > 100 ? 10 : pagesize
	};

	// Object.extend(options, req.query.options || {});

	var conditions = req.query.conditions || {};

	logger.warn("conditions", options, conditions)

	// console.log(options)
	MongoDbHelper.count(TableName, conditions, function (err, cnt) {
		MongoDbHelper.where(TableName, conditions, options, function (err, result) {
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
router.get('/test2', function (req, res) {
	res.status(200);

	var data = {
		conditions: {
			SourceId: 6,
			Id: [62788, 62772]
		},
		options: {
			Id: 1
		}
	}



	superagent.get("http://localhost:18080/products/getall")
		.query(data)
		.end(function (err, result) {
			if (err) {
				return console.log('error:', err)
			}
			res.json(
				result.text
			);
			res.end();
		});
});
router.get('/test', function (req, res) {
	res.status(200);

	var data = {
		"Id": 1,
		"SourceId": 1,
		"ProductId": "String",
		"ProductName": "String",
		"PicUrl": "String",
		"Price": 1,
		"Weight": "String",
		"InsertDate": new Date(),
		"Updatedate": "",
		"Others": {
			"Url": "String",
			"PicContent": "String",
			"Origin": "String",
			"CommentCnt": 1,
			"SoldCnt": 1,
			"Unit": "String",
			"UnitPrice": "String",
			"ScPrice": "String"
		},
		"Source": {
			"SourceId": 1,
			"SourceName": "String",
			"Category1": "String",
			"Category2": "String"
		},
		"RelationIds": "String",
		"KeyWords": "String"
	}

	superagent.get("http://localhost:18080/products/insert")
		.query(data)
		.end(function (err, result) {
			if (err) {
				return console.log('error:', err)
			}
			res.json({
				res: result
			});
			res.end();
		});
});


router.get('/insert', function (req, res) {
	res.status(200);

	//console.log('insert', req.query)
	// var data = {
	// 	"Id": 1,
	// 	"SourceId": 1,
	// 	"ProductId": "String",
	// 	"ProductName": "String",
	// 	"PicUrl": "String",
	// 	"Price": 1,
	// 	"Weight": "String",
	// 	"InsertDate": new Date(),
	// 	"Updatedate": "",
	// 	"Others": {
	// 		"Url": "String",
	// 		"PicContent": "String",
	// 		"Origin": "String",
	// 		"CommentCnt": 1,
	// 		"SoldCnt": 1,
	// 		"Unit": "String",
	// 		"UnitPrice": "String",
	// 		"ScPrice": "String"
	// 	},
	// 	"Source": {
	// 		"SourceId": 1,
	// 		"SourceName": "String",
	// 		"Category1": "String",
	// 		"Category2": "String"
	// 	},
	// 	"RelationIds": "String",
	// 	"KeyWords": "String"
	// }

	var data = req.query || {}

	if (!!data.Id) data.Id = parseInt(data.Id, 10)
	if (!!data.SourceId) data.SourceId = parseInt(data.SourceId, 10)
	if (!!data.Price) data.Price = parseFloat(data.Price)

	if (!!data.Others && !!data.Others.CommentCnt) data.Others.CommentCnt = parseInt(data.Others.CommentCnt, 10)
	if (!!data.Others && !!data.Others.SoldCnt) data.Others.SoldCnt = parseInt(data.Others.SoldCnt, 10)

	if (!!data.Source && !!data.Source.SourceId) data.Source.SourceId = parseInt(data.Source.SourceId, 10)

	if (!!data.Version) data.Version = parseFloat(data.Version)




	MongoDbHelper.save(TableName, data, function (err, result) {
		if (err) {
			console.log('insert error', err)
			res.json({
				error: err
			});
			res.end();
		} else {
			// console.log('insert success', result)

			res.json(result);
			res.end();
		}
	});
});

router.get('/insertgroup', function (req, res) {
	res.status(200);

	var data = []

	for (var i = 1; i < 100000; i++) {
		data.push({
			"Id": i,
			"SourceId": 3,
			"ProductId": i,
			"ProductName": "apple " + i,
			"PicUrl": "",
			"PicContent": "",
			"Price": "",
			"Url": "",
			"RealPrice": Math.random() * 100,
			"Unit": "个",
			"InsertDate": new Date(),
			"Updatedate": ""
		})

	}


	// function insertData(datas) {
	// 	MongoDbHelper.save(TableName, datas[0], function (err, result) {
	// 		datas = datas.slice(1)
	// 		if (datas.length > 0) {
	// 			insertData(datas)
	// 		}
	// 		else {
	// 			console.log('save over');
	// 		}
	// 	});
	// }

	// insertData(data)
	// res.json({
	// 	errorCode: 1,
	// 	errorMessage: "成功"
	// });
	// res.end();


	// function insertItem(item) {
	// 	return new Promise(function (resolve,reject) {
	// 		MongoDbHelper.save(TableName, item, function (err, result) {
	// 			if (err) {
	// 				reject("error");
	// 			} else {
	// 				resolve(result.Id);
	// 			}
	// 		});
	// 	});
	// };

	// var fetchUrls = [];

	// data.map(function (item) {

	// 	fetchUrls.push(insertItem(item))

	// })

	// Promise.all(fetchUrls).then(function (data) {

	// 	console.log(data)
	// 	res.json({
	// 		errorCode: 1,
	// 		errorMessage: "成功",
	// 		data: data
	// 	});
	// 	res.end();
	// }).catch(function(dd){
	// 	console.log(dd)
	// 	res.json({
	// 		errorCode: 1,
	// 		errorMessage: "ERROR",
	// 		data: dd
	// 	});
	// 	res.end();
	// })


	// function insertMongodb() {
	// 	return new Promise(function(resolve) {
	// 		data.map(function(item) {
	// 			MongoDbHelper.save(TableName, item, function(err, result) {
	// 				if (err) {
	// 					reject("error");
	// 				} else {
	// 					resolve(result);
	// 				}
	// 			});
	// 		})
	// 	});
	// };


	// insertMongodb().then(function(data, item) {
	// 	res.json({
	// 		errorCode: 1,
	// 		errorMessage: "成功",
	// 		data: data,
	// 		item: item
	// 	});
	// 	res.end();
	// })


});


module.exports = router;