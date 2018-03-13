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
 *  √   1. Пофиксить парсинг данных;    
 *  √+- 2. Сделать операции изменения/удаления данных;
 *  0   2,5. Изменить страницу тудухи, сделать списком (хотя вариант с карточками тоже неплохой имхо), сделать модальное
 *       окно редактирования инфы;
 *  0   3. Доделать страницу account, довести до ума, а именно:
 *  0       3.1. Сделать адекватную модель изменения данных (CRUD операции для юзера, возможно без D), парсинг и вывод пользовательской информации; 
 *  0       3.2. Переделать модель юзера, реализовать необязательную пользовательскую информацию;  
 *  0   4. Как следствие из 3.2, сделать модель регистрации и авторизации более простой а именно:
 *  0       4.1. Вынести в пользовательскую информацию имя, фамилию и прочее. Оставить только никнейм, мыло и пароль; 
 *  0       4.2. Реализовать логин либо по емейлу, либо по никнейму в одном поле;
 *  √   5. Пофиксить редиректы, возможно сделать их на серверной стороне (т.е. пофиксить проверку кукисов и респонзы);  
 *  -   6. Добавить апдейт кукисов, а именно:   
 *  -       6.1. Реализовать экспайрс кукисов только в то время, когда пользователь определённое время (3 дня) не заходит на сайт;
 *  √   7. Выпадающее меню вверху со ссылками на страницы аккаунта и логаута.
 *  √   8. Страница логаута с редиректом и всеми делами (НЕ ЗАБЫТЬ ПОТОМ ВКЛЮЧИТЬ ВСЁ-ТАКИ ЧИСТКУ КУКОВ).
 * 
 * BONUSные таски:
 *  B1. Сделать доступ к пользовательскому профилю для других юзеров;
 *  B2. Сделать френдлист;
 *  B3. Сбацать историю работы с тудушками, а именно такие вещи, как: количество выполненных, количество просранных, etc.;
 *  B4. Сделать автоудаление всякой гадости из бд, то есть тудушек, которые хранятся больше n дней (по дефолту считаю 60) в том случае, если юзер их сам не удаляет;
 * 
 * Ну вот как-то вот так. Без бонусных первостепенные задачи сделать до 12.03.2018, бонусные на данный момент не имеют дедлайна.
 *  ***/

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
            console.log("curid: " + id + ", newid: " + id++);
            return id++;
        } 
        else {
            console.log('undef id curid: ' + id);
            return 0;  
        } 
    }

    // function timeDiv(finDate) {
    //     if (Date.parse(finDate) < Date.now()) return 0;
    //     else return new Date(Date.parse(finDate) - Date.now()).toLocaleString('en-GB', {hour: 'numeric', minute: 'numeric', second: 'numeric'});
    //     // new Date(Date.parse(todo.date) - Date.now()).toLocaleString('en-GB', {hour: 'numeric', minute: 'numeric', second: 'numeric'})
    // }
    
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
                console.log(data);
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
                console.log(this.todos.length); 
                var todo_id;
                if (this.todos.length === 0) todo_id = 0
                else todo_id = Number(this.todos[this.todos.length - 1].id) + 1;
                console.log(todo_id);
                let options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                };
                // let startDate = new Date().toLocaleString("en-US", options);
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
                console.log(todo_id);
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
                console.log(todo_id);
                console.log(todo.startDate);
                console.log(todo.date);
                console.log(todo.calcDateDiv);
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
                    console.log(this.beforeEditCache.date)
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
                console.log(todo_id);
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
