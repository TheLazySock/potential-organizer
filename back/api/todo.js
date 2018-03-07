var router = require('express').Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var User = require('./models/user');
var Todo = require('./models/todo');

router.use(cookieParser());

router.post('/todo', function(req, res) {
    var user_id = req.cookies.sid;
    console.log('kooka: ' + req.cookies.sid);
    console.log('uid: ' + user_id);
    var todo = new Todo(req.body);
    todo.user_id = user_id;
    console.log('todo: ' + todo);   
    todo.save(function(err) {
        if (err) {
            res.send('Oops, there is error:' + err);
        } else {
            res.send('OK')
        }
    });
});

router.get('/todoapp', function(req, res) {
    if (!req.cookies.sid) {
        res.send('You are lose ur cookies somewhere');
    } else {
        var user_id = req.cookies.sid;
        console.log('OK with cookies', user_id);
        return Todo.find({'user_id': user_id}, function(err, data) {
            res.json(data);
            console.log(data);
        });
    }
});

// router.post('/todo', function(req, res) {
//     if (!req.cookies.sid) {
//         res.send('Error');
//     } 
//     if (!req.body) {
//         var user_id = req.cookies.sid;
//         console.log('OK with cookies', user_id);
//         return Todo.find({'user_id': user_id}, function(err, data) {
//             res.send(data);
//             console.log(data);
//         });
//     } else {
//         var user_id = req.cookies.sid;
//         console.log('kooka: ' + req.cookies.sid);
//         console.log('uid: ' + user_id);
//         var todo = new Todo(req.body);
//         console.log('todo: ' + todo);   
//         console.log('todo_origin: ' + req.body) 
//         todo.save(function(err) {
//             if (err) res.send('Oops, there is error:' + err);
//         });
//     }
// });

/*** 
 * и тут тоже срань
 * ***/

router.get('/todo', function(req, res) {
    if (!req.cookies.sid) {
        res.redirect('/');
    } else {
        res.sendFile('todo.html', {
            root: '../front/public/'
        });
    }
});

module.exports = router