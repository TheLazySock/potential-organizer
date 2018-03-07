if (checkUrl('/todo')) {

    let todoStorage = {
        fetch: function() {
            // let todos = JSON.parse(localStorage.getItem('todos') || '[]');
            let todos = [];
            fetch('/todoapp', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function(response) {
                todos = JSON.parse(response || '[]');
            })
            todos.forEach(function(todo, index) {
                todo.id = index;
            })
            todoStorage.uid = todos.length;
            return todos;
        },
        save: function(todos) {
            // localStorage.setItem('todos', JSON.stringify(todos));
            fetch('/todo', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todos[todos.length - 1])
            })
            console.log(JSON.stringify(todos[todos.length - 1]));
        }
    }

    /***
     * В общем, почти весь код выше либо не нужен, либо отчасти. Поэтому это говнище можно смело делитнуть (скорее всего), но пока пусть останется.
     * Как я понял, большую часть кода ниже тоже надо переделать/доделать. 
     * Плюс ко всему проще (наверное) в плане реализации и использования будет вернуться к старой версии, с одним списком и использовать флаг "completed"
     * для пометок вместо переноса в другой список. Да, я хотел сделать drag-n-drop именно с переносом в другой блок, но видимо если куда-то и перетаскивать
     * элементы, то в корзину, которая в будущем будет в правой части. 
     * Нафига я вообще всё это пишу? Да просто пометки для себя, чтобы не забыть. Почему тут? Ну, этот файл я точно открою ещё не раз.
     * Ну а теперь, когда со стеной текста закончили, можно и таски накидать.
     * 
     * Собственно, таски: 
     *  1. Пофиксить парсинг данных;
     *  2. Сделать операции изменения/удаления данных;
     *  3. Доделать страницу account, довести до ума, а именно:
     *      3.1. Сделать адекватную модель изменения данных (CRUD операции для юзера, возможно без D), парсинг и вывод пользовательской информации; 
     *      3.2. Переделать модель юзера, реализовать необязательную пользовательскую информацию;  
     *  4. Как следствие из 3.2, сделать модель регистрации и авторизации более простой а именно:
     *      4.1. Вынести в пользовательскую информацию имя, фамилию и прочее. Оставить только никнейм, мыло и пароль; 
     *      4.2. Реализовать логин либо по емейлу, либо по никнейму в одном поле;
     *  5. Пофиксить редиректы, возможно сделать их на серверной стороне (т.е. пофиксить проверку кукисов и респонзы);
     *  6. Добавить апдейт кукисов, а именно:
     *      6.1. Реализовать экспайрс кукисов только в то время, когда пользователь определённое время (3 дня) не заходит на сайт;
     * 
     * BONUSные таски:
     *  B1. Сделать доступ к пользовательскому профилю для других юзеров;
     *  B2. Сделать френдлист;
     *  B3. Сбацать историю работы с тудушками, а именно такие вещи, как: количество выполненных, количество просранных, etc.;
     *  B4. Сделать автоудаление всякой гадости из бд, то есть тудушек, которые хранятся больше n дней (по дефолту считаю 60) в том случае, если юзер их сам не удаляет;
     * 
     * Ну вот как-то вот так. Без бонусных первостепенные задачи сделать до 12.03.2018, бонусные на данный момент не имеют дедлайна.
     *  ***/
    
    // let completedStorage = {
    //     fetch: function() {
    //         let completed = JSON.parse(localStorage.getItem('completed') || '[]');
    //         completed.forEach(function(todo, index) {
    //             todo.id = index;
    //         })
    //         completedStorage.uid = completed.length;
    //         return completed;
    //     },
    //     save: function(completed) {
    //         localStorage.setItem('completed', JSON.stringify(completed));
    //     }
    // }
    
    var vueDate = {};
    vueDate.customdate = new Date(01/01/2000);
    
    let todoapp = new Vue({
        el: '#todoapp',
        data: {
            todos: todoStorage.fetch(),
            // completed: completedStorage.fetch(),
            todoTitle: '',
            todoText: '',
            todoDate: vueDate,
            completed: false,
            editedTodo: null,
        },
        watch: {
            todos: {
                handler: function(todos) {
                    todoStorage.save(todos)
                },
                deep: true
            },
            // completed: {
            //     handler: function(completed) {
            //         completedStorage.save(completed)
            //     },
            //     deep: true
            // }
        },
        methods: {
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
                this.todos.push({
                    id: todoStorage.uid++,
                    title: value.title,
                    text: value.text,
                    date: value.date,
                    // date: new Date(Date.now()),
                    complete: false
                })
                this.todoTitle = '';
                this.todoText = '';
                this.todoDate = vueDate;
            },
    
            // removeTodo: function(todo) {
            //     this.todos.splice(this.todos.indexOf(todo), 1)
            // },
    
            // removeCompleted: function(todo) {
            //     this.completed.splice(this.completed.indexOf(todo), 1)
            // },
    
            // completeTodo: function(todo) {
            //     let value = {};
            //     value.title = todo.title;
            //     value.text = todo.text;
            //     value.date = todo.date;
            //     this.completed.push({
            //         id: completedStorage.uid++,
            //         title: value.title,
            //         text: value.text,
            //         date: value.date,
            //         complete: true
            //     })
            //     this.todos.splice(this.todos.indexOf(todo), 1)
            // },
    
            // uncompleteTodo: function(todo) {
            //     let value = {};
            //     value.title = todo.title;
            //     value.text = todo.text;
            //     value.date = todo.date;
            //     this.todos.push({
            //         id: todoStorage.uid++,
            //         title: value.title,
            //         text: value.text,
            //         date: value.date,
            //         complete: false
            //     })
            //     this.completed.splice(this.completed.indexOf(todo), 1)
            // },
    
            // editTodo: function(todo) {
    
            // },
    
            // doneEdit: function(todo) {
    
            // },
    
            // cancelEdit: function(todo) {
    
            // },
        }
    })
    
    todoapp.$mount('#todoapp')
} 
