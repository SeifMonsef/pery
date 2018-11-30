var mongoose = require('mongoose');
var config = require('./index');

var gridfs, callback;

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true
}).
then(function () {
  console.log('Successfully connected to database on: ' +
    config.MONGO_URI);
  gridfs = require('mongoose-gridfs')({
    mongooseConnection: mongoose.connection
  });

  if (typeof callback == 'function') {
    callback(gridfs);
  }
}).
catch(function (err) {
  if (err) {
    console.error(err);
  }
});


module.exports = function (cb) {
	if (typeof gridfs != 'undefined') {
	  cb(gridfs.model);
	} else {
	  callback = cb;
	}
  }