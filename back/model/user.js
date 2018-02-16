var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    email: { type: String, default: 'none'},
    name: { type: String, default: 'none'},
    surname: { type: String, default: 'none'},
		username: { type: String, default: 'none'},
		password: { type: String, default: 'none'}
  },
);

module.exports = mongoose.model('user', userSchema);
