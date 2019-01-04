var express = require('express');
var router = express.Router();
var testdb = require('./testdb.js');
var app = express();
var MongoClient = require('mongodb').MongoClient;

function register_db(account,password){
  return new Promise(function(resolve, reject){
    MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {
      if (err) reject(err);
      var db = client.db('mydb');
      db.collection('Account',function(err,collection){
        if(err) reject(err);
        collection.find({account:account}).toArray(function(err,items){
          if(err) reject(err);
          if(items.length == 0){
            collection.insertOne({account:account, password:password },function(err, result){
              if(err) reject(err);
              resolve(1);
            });
          }
          else{
            resolve(0);
          }
        })
      })
    })
  });
}

router.post('/', function(req, res, next) {
  register_db(req.body['account'],req.body['password'])
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