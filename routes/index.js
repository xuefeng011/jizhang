var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'test',desc:global.codeVersion });
});
router.get('/login', function(req, res) {
    res.render("login",{title:"xxx"})
});



module.exports = router;
