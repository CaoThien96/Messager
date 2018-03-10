var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var User=require("../model/users");
var passport=require("passport");
require("../library/passport")(passport);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/signup',passport.authenticate('local-signup', {
  successRedirect : '/', 
  // Chuyển về trang thông tin cá nhân nếu đăng ký thành công
  failureRedirect : '/erres', 
  // Điều hướng về lại trang đăng ký nếu có lỗi
  failureFlash : true // cho phép flash messages
  }));
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/main', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
router.get('/logout', function (req, res){
  req.logout();
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});
function isLoggedIn(req, res, next) {
      // if user is authenticated in the session, carry on 
      if (req.isAuthenticated())
          return next();
      // if they aren't redirect them to the home page
      res.redirect('/');
  }
module.exports = router;
