var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var user = require('./user.js');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*
 * Routes that can be accessed by any one
 */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login' });
});

router.post('/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/product', function(req, res){
    res.json({
        productName: 'Product 1',
    });
});

module.exports = router;
