var db = require('./db')
var user = db.Schema({
  email: { type: String, default: 'test@test.test'},
  username: { type: String, required: true},
  password: { type: String, required: true, select: false},
  name: { type: String, default: 'none'},
  surname: { type: String, default: 'none'}
})

module.exports = db.model('User', user)
  