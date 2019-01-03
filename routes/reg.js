var express = require('express');
var router = express.Router();
var testdb = require('./testdb.js');
var app = express();

router.post('/', function(req, res, next) {
    console.log(req.body['account']);
    testdb.create();
    res.render('index', { title: 'Express' });
  });
router.get('/', function(req, res, next) {
    testdb.create;
    res.render('reg', { title: 'Express' });
  });

  module.exports = router;