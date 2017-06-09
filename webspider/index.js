const superagent = require('superagent');
const cheerio = require('cheerio');


var targetUrl = 'https://cnodejs.org/';

superagent.get(targetUrl)
	.end(function(err, res) {
		if (err) {
			return console.log('error:', err)
		}
		var $ = cheerio.load(res.text);
		$('#topic_list .topic_title').each(function(index, element) {
			if (index < 4) {
				var href = $(element).attr('href');
				console.log(href)
			}
		})
	});