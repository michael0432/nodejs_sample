var express = require('express');
var router = express.Router();
var object = require('./object');
var api = require('./api');

/* GET home page. */
router.get('/', function(req, res, next) {
  api.get_all_item()
  .then(result =>{
    var items = result;
    if(req.session.account){
      res.render('index', { title: req.session.account, items: items});
    }
    else{
      res.render('index', { title: "Guest", items: items});
    }
  })
  .catch((err) =>{
    console.log(err.message);
  });
});

// tmp
router.post('/add_item',function(req, res, next){
  console.log(req.body['id']);
  var i = new object.Item(req.body['id'],req.body['name'],req.body['price']);
  api.add_item(i)
  .then(result =>{
    if (result == 0){
      console.log('fail');
    }
    else{
      console.log('success');
    }
  })
  .catch((err) =>{
    console.log(err.message);
  });
});
module.exports = router;
