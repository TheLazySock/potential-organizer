var router = require('express').Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var User = require('./models/user');
var Todo = require('./models/todo');

router.use(cookieParser());

router.get('/todoapp', function(req, res) {
    if (!req.cookies.sid) {
        res.send('You are lose ur cookies somewhere');
    } else {
        var user_id = req.cookies.sid;
        console.log('OK with cookies', user_id);
        return Todo.find({'user_id': user_id},{_id: 0, __v: 0, user_id: 0}, function(err, data) {
            res.json(data);
            console.log(data);
        });
    }
});

router.post('/todoapp', function(req, res) {
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

router.put('/todoapp', function(req, res) {
    var user_id = req.cookies.sid;
    var todo_id = req.body.todo_id;
    if (req.body.title || req.body.text || req.body.date) {
        // res.send('Also OK');
        return Todo.update({'user_id': user_id, 'id': todo_id}, {$set: {title : req.body.title, text: req.body.text, date: req.body.date}}, function(err){
            if (err) {
                res.send('Oops, there is error:' + err);
            } else {
                res.send('OK');
            }
        })
    } else {
        return Todo.update({'user_id': user_id, 'id': todo_id}, {$set: {completed : req.body.completed}}, function(err){
            if (err) {
                res.send('Oops, there is error:' + err);
            } else {
                res.send('OK');
            }
        });
    }
});

router.delete('/todoapp', function(req, res) {
    var todo_id = req.body.todo_id
    var user_id = req.cookies.sid;
    console.log('uid: ' + user_id);
    console.log('todoid: ' + todo_id)   ;
    return Todo.remove({'user_id': user_id, 'id': todo_id}, function(err){
        if (err) {
            res.send('Oops, there is error:' + err);
        } else {
            res.send('OK');
        }
    });
});

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