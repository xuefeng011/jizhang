var express = require('express');
var router = express.Router();

var superagent = require('superagent');
var cheerio = require('cheerio');

var targetUrl = 'https://cnodejs.or111g/';



router.get('/', function(req, res) {
	res.status(200);
	res.json({
		errorCode: 1,
		errorMessage: "成功",
		datas: "test"
	});
	res.end();
});



router.get('/get', function(req, res) {


	superagent.get(targetUrl)
		.end(function(err, result) {
			if (err) {
				res.status(200);
				res.json({
					errorCode: 1,
					errorMessage: 'error:',
					datas:err
				});
				res.end()
				return;
			}
			var $ = cheerio.load(result.text);
			var hrefs = []
			$('#topic_list .topic_title').each(function(index, element) {
				if (index < 4) {
					var href = $(element).attr('href');
					hrefs.push(href)
				}
			})
			res.status(200);
			res.json({
				errorCode: 1,
				errorMessage: result.text,
				datas: hrefs
			});
			res.end()
		});
});

module.exports = router;