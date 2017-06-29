var express = require('express');
var router = express.Router();

var MongoDbHelper = require('../service/mongodbhelper');


var TableName = "sellections";

var logger = require('../service/logger').logger('normal');

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
				errorMessage: err,
				datas: []
			});
		} else {
			res.json({
				errorCode: 1,
				errorMessage: "成功",
				datas: result,

			});
		}
	});

});


router.get('/remove', function(req, res) {
	res.status(200);

	var _ID = req.query._id || '';
	var conditions = null;

	if (!!_ID) conditions = {
		"_id": _ID
	};

	MongoDbHelper.remove(TableName, conditions, function(err, result) {
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


router.get('/insertOrUpdate', function(req, res) {
	res.status(200);

	var _ID = req.query._id || '';
	var conditions = {
		"_id": _ID
	};

	if (!!_ID) {

		var data = {
			"Type": req.query.Type || 0,
			"Key": req.query.Key || "",
			"Value": req.query.Value || ""
		};

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
					updateresult: updateresult
				});
				res.end();
			}
		});

	} else {

		var data = {
			"Type": req.query.Type || 0,
			"Key": req.query.Key || "",
			"Value": req.query.Value || ""
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



module.exports = router;