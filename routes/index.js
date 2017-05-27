var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log(req,res)
    res.render('index', { title: 'test',desc:new Date().valueOf() });
});
router.get('/login', function(req, res) {
    res.render("login",{title:"xxx"})
});



module.exports = router;
