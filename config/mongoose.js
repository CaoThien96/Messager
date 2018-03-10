exports.connect=function(url){
  var mongoose = require('mongoose');
  var db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', function () {
    
  });
  mongoose.connect(url);
}
