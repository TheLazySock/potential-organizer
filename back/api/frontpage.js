var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');

router.get('/', function(req, res) {
    if (checkAuth) {
        // console.log("Bredyatina" + checkAuth);
        // console.log(req.session.user);
        res.set({ 'x-auth': "auth" });
        res.sendFile('index.html', {
            root: '../front/public/'
        });
    } else {
        res.set({ 'x-auth': "unauth" });        
        res.sendFile('index.html', {
            root: '../front/public/'
        });
    }
});

// router.get('/', function(req, res) {
//     res.sendFile('index.html', {
//         root: '../front/public/'
//     });
// });

module.exports = router