if (checkUrl('/todo')) {

    let todoStorage = {
        save: function(todos) {
            fetch('/todoapp', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todos[todos.length - 1])
            })
        }
    }
    
    var vueDate = {};
    vueDate.customdate = new Date(2000, 1, 1, 0, 0);

    function checkId(id) {
        if (id !== "undefined") {
            return id++;
        } 
        else {
            return 0;  
        } 
    }
    
    let todoapp = new Vue({
        el: '#todoapp',
        data: {
            todos: [],
            todoTitle: '',
            todoText: '',
            todoDate: vueDate,
            todoStartDate: null,
            completed: false,
            editedTodo: null,
            isEditing: false,
            beforeEditCache: {}
        },
        created() {
            let todost = [];
            fetch('/todoapp', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                todost = data;
            })
            .then(function() {
                todoapp.todos = todost;
            })
        },
        methods: {
            timeDiv: function(finDate) {
                if (Date.parse(finDate) < Date.now()) return 0;
                else return new Date(Date.parse(finDate) - Date.now()).toLocaleString('en-GB', {hour: 'numeric', minute: 'numeric', second: 'numeric'});
            },
            addTodo: function() {
                if (this.todoTitle == '' || this.todoText == '' || this.todoDate.customdate == '') {
                    return;
                }
                let value = {};
                value.title = this.todoTitle && this.todoTitle.trim();
                value.text = this.todoText && this.todoText.trim();
                value.date = this.todoDate.customdate;
                if (!value) {
                    return;
                }

                var todo_id;
                if (this.todos.length === 0) todo_id = 0
                else todo_id = Number(this.todos[this.todos.length - 1].id) + 1;

                let options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                };
                let currYear = new Date().getFullYear();
                let currMonth = (new Date().getMonth() + 1 < 10) ? "0" + (new Date().getMonth()+1) : new Date().getMonth()+1;
                let startDate = "" + currYear + "-" + currMonth + "-" + new Date().getDate();
                this.todos.push({
                    id: todo_id,
                    title: value.title,
                    text: value.text,
                    startDate: startDate,
                    date: value.date,
                    completed: false
                })
                todoStorage.save(this.todos);
                this.todoTitle = '';
                this.todoText = '';
                this.todoDate = vueDate;
            },
    
            removeTodo: function(todo) {
                var todo_id = todo.id;
                fetch('/todoapp', {
                    method: 'DELETE',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({todo_id: todo_id})
                });
                this.todos.splice(this.todos.indexOf(todo), 1);
            },

            completeTodo: function(todo) {
                var todo_id = todo.id;
                if (todo.completed == false) {
                    todo.completed = true;
                } else {
                    todo.completed = false;
                }
                var sendingInfo = {
                    todo_id: todo_id,
                    completed: todo.completed
                }
                fetch('/todoapp', {
                    method: 'PUT',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sendingInfo)
                });
            },

            editTodo: function(todo) {
                this.beforeEditCache.title = todo.title;
                this.beforeEditCache.text = todo.text;
                this.beforeEditCache.date = todo.date;
                this.editedTodo = todo;
                this.isEditing = true;
            },
        
            doneEdit: function(todo) {
                if (!this.editedTodo) {
                    return
                }
                this.editedTodo = null
                let value = {};
                let todo_id = todo.id;
                value.todo_id = todo_id;
                value.title = this.todoTitle && this.todoTitle.trim();
                value.text = this.todoText && this.todoText.trim();
                value.date = this.todoDate.customdate;
                if (!this.todoTitle) {
                    value.title = this.beforeEditCache.title;
                } 
                if (!this.todoText) {
                    value.text = this.beforeEditCache.text;
                }
                if (this.todoDate.customdate == '' || this.todoDate == '1970-01-01T00:00:00.000Z') {
                    value.date = this.beforeEditCache.date;
                }
                fetch('/todoapp', {
                    method: 'PUT',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                })
                .then(function(response) {
                    if (response.status === 200) {
                        todo.title = value.title;
                        todo.text = value.text;
                        todo.date = value.date;
                    }
                });
                this.editedTodo = null;
            },
        
            cancelEdit: function(todo) {
                this.editedTodo = null
                todo.title = this.beforeEditCache.title;
                todo.text = this.beforeEditCache.text;
                todo.date = this.beforeEditCache.date;
            },
        }
    })
    
    todoapp.$mount('#todoapp')
} 
