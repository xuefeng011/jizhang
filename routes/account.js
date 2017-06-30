var express = require('express');
var router = express.Router();

var MongoDbHelper = require('../service/mongodbhelper');


var TableName = "Account";

var logger = require('../service/logger').logger('normal');

router.get('/', function(req, res) {
	res.status(200);
	res.json("test/account");
	res.end();
});


router.post('/check', function(req, res) {
	res.status(200);

	// console.log('check',req)

	var conditions = {
		"Name": req.query.Name || 'xxx',
		"Password": req.query.Password || 'xxx',
		"IsValid": true
	}


	 res.writeHead(404, {'Content-Type': 'text/plain;charset=utf-8'});
        res.write("{'errcode':404,'errmsg':'404 页面不见啦'}");
        res.end();

	// MongoDbHelper.findOne(TableName, conditions, function(err, result) {
	// 	if (err) {
	// 		res.render('login', {
	// 			message: "登录失败",
	// 			error: err
	// 		});
	// 	} else {
	// 		if (!result || result.length <= 0) {
	// 			res.render('login', {
	// 			message: "用户名密码错误",
	// 			error: ""
	// 		});
	// 		} else {
	// 			console.log("checklogin", result, String(result._id))
	// 			res.cookie('ctoken', String(result._id), {
	// 				maxAge: 600 * 1000
	// 			});
	// 			res.redirect("/web/#/home")
	// 		}
	// 	}
	// });

});


router.get('/create', function(req, res) {
	res.status(200);

	var data = {
		"Name": req.query.Name,
		"Password": req.query.Password,
		"IsValid": true
	}


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

});


var auth = function(baseUrl, token) {
	return new Promise(function(resolve, reject) {
		if (!baseUrl || baseUrl.indexOf("account") > 0 || baseUrl.indexOf("login") > 0) {

			resolve("account skip")
		}
		if (!token || token.length < 20) {

			reject("no token")
		}

		var conditions = {
			"_id": token
		}

		MongoDbHelper.find(TableName, conditions, {}, function(err, result) {
			if (err) {
				reject("db err")
			} else {
				resolve("db succ")
			}
		})

		// console.log('rrrrrrrrrrrrrrrr')
		// reject(3)

	});
}



module.exports = {
	auth: auth,
	router: router
};