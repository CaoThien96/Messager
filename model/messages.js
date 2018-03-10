var mongoose = require('mongoose');
var schema = mongoose.Schema({
    body       : String,
    senderId   : String,
    receiverId : String,
    created    : String,
    status     : Boolean
  });
var messages=module.exports=mongoose.model('messages', schema);