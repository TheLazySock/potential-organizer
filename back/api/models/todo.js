var db = require('./db')
var todo = db.Schema({
  id: {type: String},
  user_id: { type: String},
  title: { type: String, required: true},
  text: { type: String, required: true},
  date: { type: String, required: true},
  completed: { type: Boolean}
});

module.exports = db.model('Todo', todo)
  