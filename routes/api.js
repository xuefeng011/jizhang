var express = require('express');
var router = express.Router();

var MongoDbHelper = require('../service/mongodbhelper');


var TableName = "goods";

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


router.get('/create', function(req, res) {
	res.status(200);
	var data = {
		"name": req.query.name || '',
		"pic": req.query.pic || '',
		"source": req.query.source || '',
		"group": req.query.group || '',
		"money": req.query.money || '',
		"insertdate": new Date().valueOf(),
		"updatedate": '',
		"user": req.query.user || ''
	}


	MongoDbHelper.save(TableName, data, function(err, result) {
		res.json(result);
		res.end();
	});
});



router.get('/update', function(req, res) {
	res.status(200);
	var data = {};

	!!req.query.name ? data.name = req.query.name : null;
	!!req.query.pic ? data.pic = req.query.pic : null;
	!!req.query.source ? data.source = req.query.source : null;
	!!req.query.group ? data.group = req.query.group : null;
	!!req.query.money ? data.money = req.query.money : null;
	!!req.query.user ? data.user = req.query.user : null;

	var goodsId = req.query.id;
	if (!goodsId) {
		res.json({
			errorCode: -1,
			errorMessage: "失败"
		});
		res.end();

	} else {

		MongoDbHelper.update(TableName, {
			"_id": goodsId
		}, data, function(err, result) {

			if (err) {
				res.json({
					errorCode: -2,
					errorMessage: err
				});
			} else {
				res.json({
					errorCode: result.ok,
					errorMessage: "成功"
				});
			}
			res.end();
		});

	}

});


module.exports = router;