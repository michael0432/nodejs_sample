var express = require('express');
var router = express.Router();
var api = require('./api');

router.post('/', function(req, res, next) {
  api.regis(req.body['account'],req.body['password'])
    .then(result =>{
      if (result == 1){
        LOGIN = true;
        LOGIN_ACCOUNT = req.body['account'];
        res.render('index', { title: 'Register Success'+LOGIN_ACCOUNT });
      }
      else{
        res.render('index', { title: 'Register Fail' });
      }
    })
    .catch((err) => {
      console.log(err.message)
    })
});

router.get('/', function(req, res, next) {
  res.render('reg');
});

  module.exports = router;