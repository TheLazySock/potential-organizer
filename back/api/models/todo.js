var db = require('./db')
var todo = db.Schema({
    user_id: { type: String},
    title: { type: String, required: true},
    text: { type: String, required: true},
    date: { type: String, required: true}
  /***
   * Херотааааааааааааааааааааааааа
   ***/
});

module.exports = db.model('Todo', todo)
  