let todoStorage = {
    fetch: function() {
        let todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos.forEach(function(todo, index) {
            todo.id = index;
        })
        todoStorage.uid = todos.length;
        return todos;
    },
    save: function(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

let completedStorage = {
    fetch: function() {
        let completed = JSON.parse(localStorage.getItem('completed') || '[]');
        completed.forEach(function(todo, index) {
            todo.id = index;
        })
        completedStorage.uid = completed.length;
        return completed;
    },
    save: function(completed) {
        localStorage.setItem('completed', JSON.stringify(completed));
    }
}

var vueDate = {};
vueDate.customdate = new Date(01/01/2000);

let todoapp = new Vue({
    el: '#todoapp',
    data: {
        todos: todoStorage.fetch(),
        completed: completedStorage.fetch(),
        todoTitle: '',
        todoText: '',
        todoDate: vueDate,
        editedTodo: null,
    },
    watch: {
        todos: {
            handler: function(todos) {
                todoStorage.save(todos)
            },
            deep: true
        },
        completed: {
            handler: function(completed) {
                completedStorage.save(completed)
            },
            deep: true
        }
    },
    methods: {
        addTodo: function() {
            let value = {};
            value.title = this.todoTitle && this.todoTitle.trim();
            value.text = this.todoText && this.todoText.trim();
            value.date = this.todoDate.customdate;
            if (!value) {
                return
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: value.title,
                text: value.text,
                date: value.date,
                complete: false
            })
            this.todoTitle = '';
            this.todoText = '';
            this.todoDate = vueDate;
        },

        removeTodo: function(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1)
        },

        removeCompleted: function(todo) {
            this.completed.splice(this.completed.indexOf(todo), 1)
        },

        completeTodo: function(todo) {
            let value = {};
            value.title = todo.title;
            value.text = todo.text;
            value.date = todo.date;
            this.completed.push({
                id: completedStorage.uid++,
                title: value.title,
                text: value.text,
                date: value.date,
                complete: true
            })
            this.todos.splice(this.todos.indexOf(todo), 1)
        },

        uncompleteTodo: function(todo) {
            let value = {};
            value.title = todo.title;
            value.text = todo.text;
            value.date = todo.date;
            this.todos.push({
                id: todoStorage.uid++,
                title: value.title,
                text: value.text,
                date: value.date,
                complete: false
            })
            this.completed.splice(this.completed.indexOf(todo), 1)
        },

        // editTodo: function(todo) {

        // },

        // doneEdit: function(todo) {

        // },

        // cancelEdit: function(todo) {

        // },
    }
})

todoapp.$mount('#todoapp')