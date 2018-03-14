var db = require('./db')
var d = new Date;
var dateNow = d.toUTCString();

var user = db.Schema({
  email: { 
    type: String,  
    unique: true
  },
  username: { 
    type: String, 
    required: true, 
    unique: true
  },
  password: { 
    type: String, 
    required: true, 
    select: false
  },
  name: { 
    type: String, 
    default: 'Name'
  },
  surname: { 
    type: String, 
    default: 'Surname'
  },
  sex: { 
    type: String, 
    default: 'Male'
  },
  birthday: {
    type: Date,
    default: dateNow
  },
  avatar: {
    type: String,
    default: 'https://i.imgur.com/0clB3Km.png'
  },
  regDate: {
    type: Date,
    default: dateNow
  },
  phone: {
    type: Number,
  },
  facebook: {
    type: String,
  },
  vk: {
    type: String,
  },
  twitter: { 
    type: String,
  },
  todosAllCount: {
    type: Number,
    default: 0
  },
  todosCompletedCount: {
    type: Number,
    default: 0
  }
})

module.exports = db.model('User', user)
  