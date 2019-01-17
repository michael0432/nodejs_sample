var express = require('express');
var router = express.Router();
var api = require('./api');
var object = require('./object');

/* GET users listing. */
router.get('/:account', function(req, res, next) {
    //res.render('index', {title: req.params.account})
    api.get_user_data(req.params.account)
    .then(result =>{
        var user_obj = new object.User();
        var user_obj = result;
        res.render('users', {account: user_obj.account , password: user_obj.password})
    })
    .catch((err) =>{
        console.log(err.message);
    })
});

module.exports = router;
