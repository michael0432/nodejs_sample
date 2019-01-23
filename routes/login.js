var express = require('express');
var router = express.Router();
var api = require('./api');
var isLogin = false;

router.post('/', function(req, res, next) {
    api.login(req.body['account'],req.body['password'])
        .then(result =>{
            if(result == 1){
                req.session.account = req.body['account'];
                res.redirect('/');
            }
            else{
                res.redirect('/');
            }
        })
        .catch((err) =>{
            console.log(err.message);
        })
});

router.get('/', function(req, res, next) {
    //res.render('login');
    isLogin = false;
    if(req.session.account){
        isLogin = true;
        res.redirect('/');
    }
    else{
        res.render('login');
    }
});

module.exports = router;