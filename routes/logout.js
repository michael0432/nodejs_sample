var express = require('express');
var router = express.Router();
var api = require('./api');

router.get('/', function(req, res, next){
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;