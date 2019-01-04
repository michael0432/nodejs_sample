var express = require('express');
var router = express.Router();
var app = express();
var MongoClient = require('mongodb').MongoClient;

function login_db(account,password){
    return new Promise(function(reslove, reject){
        MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client){
            if (err) reject(err);
            var db = client.db('mydb');
            db.collection('Account',function(err,collection){
                if(err) reject(err);
                collection.find({account:account}).toArray(function(err,items){
                    if(err) reject(err);
                    if(items.length == 1){
                        if(items[0].account == account && items[0].password == password){
                            reslove(1);
                        }
                        else{
                            reslove(0);
                        }
                    }
                    else{
                        reslove(0);
                    }
                })
            })
        })
    })
}

router.post('/', function(req, res, next) {
    login_db(req.body['account'],req.body['password'])
        .then(result =>{
            if(result == 1){
                LOGIN = true;
                LOGIN_ACCOUNT = req.body['account'];
                res.render('index', { title: 'Login Success' });
            }
            else{
                res.render('index', { title: 'Login Fail' });
            }
        })
        .catch((err) =>{
            console.log(err.message);
        })
});
router.get('/', function(req, res, next) {
    res.render('reg');
});

module.exports = router;