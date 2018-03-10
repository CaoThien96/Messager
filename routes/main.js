var express = require('express');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();
var http = require('http').Server(express());
var User = new require('../model/users');
var Friend = require('../model/friends');
// Controllers
var messager=require('../controllers/messager')
var findUser=require('../controllers/findUser')
/* GET users listing. */
//authenticated
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
router.get('/', isLoggedIn, messager.index);
router.post('/find',isLoggedIn,urlencodedParser,findUser.getUser)
module.exports = router;
