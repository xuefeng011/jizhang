var user = require('../database/db').user;



var method = {
	get: function(name, password, cb) {
		console.log(1111, name, password)
		var query_doc = {
			name: name,
			password: password
		};

		user.count(query_doc, function(err, doc) {
			console.log(1333, doc)
			if (err)

			{
				cb("xxx")
			}
			cb("yyy " + doc);
		});


	},
	set: function(name, password) {
		var query_doc = {
			name: name,
			password: password
		};

		user.count(query_doc, function(err, doc) {
			return doc;
		});
	}
}

module.exports = method;