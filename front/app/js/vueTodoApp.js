let todoStorage = {
    fetch: function() {
        let todos = JSON.parse(localStorage.getItem('todos') || '[]')
        todos.forEach(function(todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function(todos) {
        localStorage.setItem('todos', JSON.stringify(todos))
    }
}

var vueDate = {};
vueDate.customdate = new Date(01/01/2000);

let todoapp = new Vue({
    el: '#todoapp',
    data: {
        todos: todoStorage.fetch(),
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
                completed: false
            })
            this.todoTitle = '';
            this.todoText = '';
            this.todoDate = vueDate;
        },

        // removeTodo: function(todo) {
        //     this.todos.splice(this.todos.indexOf(todo), 1)
        // },

        // editTodo: function(todo) {

        // },

        // doneEdit: function(todo) {

        // },

        // cancelEdit: function(todo) {

        // },

        // removeCompleted: function() {
            
        // }
    }
})

todoapp.$mount('#todoapp')