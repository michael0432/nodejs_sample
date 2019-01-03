var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res, next) {
    res.render('index', {title: req.params.name})
    //res.send('The time is'+new Date().toString());
});

module.exports = router;