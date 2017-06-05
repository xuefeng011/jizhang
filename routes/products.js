var express = require('express');
var router = express.Router();

var MongoDbHelper = require('../service/mongodbhelper');


var TableName = "Products";

router.get('/', function(req, res) {
	res.status(200);
	res.json("test");
	res.end();
});


router.get('/get', function(req, res) {
	res.status(200);
	MongoDbHelper.find(TableName, null, null, function(err, result) {
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

	var results = Number(req.query.results || '10');
	var page = Number(req.query.page || '1');
	var sortField = req.query.sortField || 'Id';
	var sortOrder = Number(req.query.sortOrder || '-1');



	var _sort = {}

	switch (sortField) {
		case "Id":
			_sort = {
				"Id": sortOrder
			};
			break;
		case "SourceId":
			_sort = {
				"SourceId": sortOrder
			};
			break;
		case "ProductId":
			_sort = {
				"ProductId": sortOrder
			};
			break;
		case "ProductName":
			_sort = {
				"ProductName": sortOrder
			};
			break;
		case "PicUrl":
			_sort = {
				"StPicUrlring": sortOrder
			};
			break;
		case "PicContent":
			_sort = {
				"PicContent": sortOrder
			};
			break;
		case "Price":
			_sort = {
				"Price": sortOrder
			};
			break;
		case "Url":
			_sort = {
				"Url": sortOrder
			};
			break;
		case "RealPrice":
			_sort = {
				"RealPrice": sortOrder
			};
			break;
		case "Unit":
			_sort = {
				"Unit": sortOrder
			};
			break;
		case "InsertDate":
			_sort = {
				"InsertDate": sortOrder
			};
			break;
		case "Updatedate":
			_sort = {
				"Updatedate": sortOrder
			};
			break;
	}

	//username:{$in:["延思","三"]}
	//Id: {$lt: 50}


	var conditions = {};
	var options = {
		sort: _sort,
		skip: results * (page - 1) > 0 ? 0 : results * (page - 1),
		limit: results < 0 || results > 100 ? 10 : results
	};

	console.log(options)
	MongoDbHelper.where(TableName, conditions, options, function(err, result) {
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


router.get('/insert', function(req, res) {
	res.status(200);
	// var data = {
	// 	"name": req.query.name || '',
	// 	"pic": req.query.pic || '',
	// 	"source": req.query.source || '',
	// 	"group": req.query.group || '',
	// 	"money": req.query.money || '',
	// 	"insertdate": new Date().valueOf(),
	// 	"updatedate": '',
	// 	"user": req.query.user || ''
	// }

	var id = req.query.Id;

	var data = {
		"Id": id,
		"SourceId": "1",
		"ProductId": id,
		"ProductName": "apple " + id,
		"PicUrl": "",
		"PicContent": "",
		"Price": "",
		"Url": "",
		"RealPrice": Math.random() * 100,
		"Unit": "个",
		"InsertDate": new Date(),
		"Updatedate": ""
	}

	MongoDbHelper.save(TableName, data, function(err, result) {
		res.json(result);
		res.end();
	});
});


module.exports = router;