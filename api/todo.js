var router = require('express').Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var User = require('./models/user');
var Todo = require('./models/todo');
var checkAuth = require('./middlewares/checkAuth');

router.use(cookieParser());

router.get('/todoapp', checkAuth, function (req, res) {
    var user_id = req.user_id;
    console.log('OK with cookies', user_id);
    return Todo.find({ 'user_id': user_id }, { _id: 0, __v: 0, user_id: 0 }, function (err, data) {
        res.json(data);
        console.log(data);
    });
});

router.post('/todoapp', checkAuth, function (req, res) {
    var user_id = req.user_id;
    console.log('kooka: ' + req.cookies.sid);
    console.log('uid: ' + user_id);
    var todo = new Todo(req.body);
    todo.user_id = user_id;
    console.log('todo: ' + todo);
    // var allCount = User.find({'_id': user_id}, {todosAllCount: true}) || 0; 
    // console.log(allCount);  
    User.update({ '_id': user_id }, { $inc: { todosAllCount: 1 } }, function (err) {
        if (err) {
            res.send('Oops' + err);
        }
    });
    todo.save(function (err) {
        if (err) {
            res.send('Oops, there is error:' + err);
        } else {
            res.send('OK')
        }
    });
});

router.put('/todoapp', checkAuth, function (req, res) {
    var user_id = req.user_id;
    var todo_id = req.body.todo_id;
    console.log(req.body);
    if (req.body.title || req.body.text || req.body.date) {
        return Todo.update({ 'user_id': user_id, 'id': todo_id }, { $set: { title: req.body.title, text: req.body.text, date: req.body.date } }, function (err) {
            if (err) {
                res.send('Oops, there is error:' + err);
            } else {
                res.send('OK');
            }
        })
    } else {
        if (req.body.completed === true) {
            User.update({ '_id': user_id }, { $inc: { todosCompletedCount: 1 } }, function (err) {
                if (err) {
                    res.send('Oops' + err);
                }
            });
        } else {
            User.update({ '_id': user_id }, { $inc: { todosCompletedCount: -1 } }, function (err) {
                if (err) {
                    res.send('Oops' + err);
                }
            });
        }
        return Todo.update({ 'user_id': user_id, 'id': todo_id }, { $set: { completed: req.body.completed } }, function (err) {
            if (err) {
                res.send('Oops, there is error:' + err);
            } else {
                res.send('OK');
            }
        });
    }
});

router.delete('/todoapp', checkAuth, function (req, res) {
    var todo_id = req.body.todo_id
    var user_id = req.user_id;
    console.log('uid: ' + user_id);
    console.log('todoid: ' + todo_id);
    return Todo.remove({ 'user_id': user_id, 'id': todo_id }, function (err) {
        if (err) {
            res.send('Oops, there is error:' + err);
        } else {
            res.send('OK');
        }
    });
});

router.get('/todo', checkAuth, function (req, res) {
    res.sendFile('todo.html', {
        root: './front/public/'
    });
});

module.exports = router