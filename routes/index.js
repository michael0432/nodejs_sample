var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.account){
    res.render('index', { title: req.session.account });
  }
  else{
    res.render('index', { title: 'Guest' });
  }
  
});

module.exports = router;
