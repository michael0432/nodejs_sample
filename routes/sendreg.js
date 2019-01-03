var express = require('express');
var router = express.Router();
var testdb = require('./testdb.js');
var app = express();

router.get('/sendreg', function(req, res, next) {
    app.post('reg',function(req,res){
        testdb.create;
        return res.redirect('/index');
    });
    res.render('index', { title: 'Express' });
    
  });

  module.exports = router;