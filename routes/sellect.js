var express = require('express');
var router = express.Router();


var MongoDbHelper = require('../service/mongodbhelper');


router.get('/test/:tablename', function(req, res) {
	res.status(200);
	res.json("sellect" + req.params.tablename);
	res.end();
});


router.get('/get/:tablename', function(req, res) {
	res.status(200);
	MongoDbHelper.find(req.params.tablename || 'notable', null, null, function(err, result) {
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

		res.end();
	});
});

router.get('/set/:tablename', function(req, res) {
	res.status(200);

	if (!req.query.name) {
		res.json({
			errorCode: -1,
			errorMessage: "参数不正确"
		});
		res.end();
		return;
	}

	var data = {
		"name": req.query.name || '-',
		"insertdate": new Date().valueOf(),
		"updatedate": "",
		"user": "sys"
	}

	MongoDbHelper.save(req.params.tablename || 'notable', data, function(err, result) {
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
});

router.get('/update/:tablename', function(req, res) {
	res.status(200);

	if (!req.query.name) {
		res.json({
			errorCode: -1,
			errorMessage: "参数不正确"
		});
		res.end();
		return;
	}


	var conditions = !!req.query.id ? {
		"_id": req.query.id
	} : null;



	var data = {
		"name": req.query.name || '-',
		"updatedate": new Date().valueOf(),
		"user": "sys"
	}

	MongoDbHelper.update(req.params.tablename || 'notable', conditions, data, function(err, result) {
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
});


router.get('/del/:tablename', function(req, res) {
	res.status(200);

	if (!req.query.id) {
		res.json({
			errorCode: -1,
			errorMessage: "参数不正确"
		});
		res.end();
		return;
	}

	var queryid = req.query.id || '-';


	MongoDbHelper.remove(req.params.tablename || 'notable', {
		"_id": queryid
	}, function(err, result) {
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
});


module.exports = router;