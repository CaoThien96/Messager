var mongoose = require('mongoose');
var schema = mongoose.Schema({
    userId: String,
    friendId: String,
    dateModified    : String
  });
var friends=module.exports=mongoose.model('friends', schema);
