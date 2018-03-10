var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var users = mongoose.Schema({
  username: String,
  password: String,
  name    : String,
  friend  : String,
  avatar  : String,
  status  : Number,
  created : String
});
var users =module.exports= mongoose.model('users', users);
module.exports.generateHash=function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
 };
module.exports.validPassword=function(password,password_user) {
  return bcrypt.compareSync(password, password_user);
 };
module.exports.getUserByUsename = function(username,callback){
  var query={username:username};
  users.findOne(query,callback);
}
module.exports.createUser=function(newUser,callback){
  newUser.password=bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8), null);
  newUser.save(callback);
}