var mongoose = require('mongoose');
var db_url = 'mongodb://admin:admin@ds235388.mlab.com:35388/potential-organizer'
mongoose.connect(db_url, function(){
    console.log('MongoDB connected sucessfully')
})

module.exports = mongoose