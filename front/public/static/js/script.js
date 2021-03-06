// var DragManager = new function() {

//   /**
//    * составной объект для хранения информации о переносе:
//    * {
//    *   elem - элемент, на котором была зажата мышь
//    *   avatar - аватар
//    *   downX/downY - координаты, на которых был mousedown
//    *   shiftX/shiftY - относительный сдвиг курсора от угла элемента
//    * }
//    */
//   var dragObject = {};

//   var self = this;

//   function onMouseDown(e) {

//     if (e.which != 1) return;

//     var elem = e.target.closest('.draggable');
//     if (!elem) return;

//     dragObject.elem = elem;

//     // запомним, что элемент нажат на текущих координатах pageX/pageY
//     dragObject.downX = e.pageX;
//     dragObject.downY = e.pageY;

//     return false;
//   }

//   function onMouseMove(e) {
//     if (!dragObject.elem) return; // элемент не зажат

//     if (!dragObject.avatar) { // если перенос не начат...
//       var moveX = e.pageX - dragObject.downX;
//       var moveY = e.pageY - dragObject.downY;

//       // если мышь передвинулась в нажатом состоянии недостаточно далеко
//       if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
//         return;
//       }

//       // начинаем перенос
//       dragObject.avatar = createAvatar(e); // создать аватар
//       if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
//         dragObject = {};
//         return;
//       }

//       // аватар создан успешно
//       // создать вспомогательные свойства shiftX/shiftY
//       var coords = getCoords(dragObject.avatar);
//       dragObject.shiftX = dragObject.downX - coords.left;
//       dragObject.shiftY = dragObject.downY - coords.top;

//       startDrag(e); // отобразить начало переноса
//     }

//     // отобразить перенос объекта при каждом движении мыши
//     dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
//     dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

//     return false;
//   }

//   function onMouseUp(e) {
//     if (dragObject.avatar) { // если перенос идет
//       finishDrag(e);
//     }

//     // перенос либо не начинался, либо завершился
//     // в любом случае очистим "состояние переноса" dragObject
//     dragObject = {};
//   }

//   function finishDrag(e) {
//     var dropElem = findDroppable(e);

//     if (!dropElem) {
//       self.onDragCancel(dragObject);
//     } else {
//       self.onDragEnd(dragObject, dropElem);
//     }
//   }

//   function createAvatar(e) {

//     // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
//     var avatar = dragObject.elem;
//     var old = {
//       parent: avatar.parentNode,
//       nextSibling: avatar.nextSibling,
//       position: avatar.position || '',
//       left: avatar.left || '',
//       top: avatar.top || '',
//       zIndex: avatar.zIndex || ''
//     };

//     // функция для отмены переноса
//     avatar.rollback = function() {
//       old.parent.insertBefore(avatar, old.nextSibling);
//       avatar.style.position = old.position;
//       avatar.style.left = old.left;
//       avatar.style.top = old.top;
//       avatar.style.zIndex = old.zIndex
//     };

//     return avatar;
//   }

//   function startDrag(e) {
//     var avatar = dragObject.avatar;

//     // инициировать начало переноса
//     document.body.appendChild(avatar);
//     avatar.style.zIndex = 9999;
//     avatar.style.position = 'absolute';
//   }

//   function findDroppable(event) {
//     // спрячем переносимый элемент
//     dragObject.avatar.hidden = true;

//     // получить самый вложенный элемент под курсором мыши
//     var elem = document.elementFromPoint(event.clientX, event.clientY);

//     // показать переносимый элемент обратно
//     dragObject.avatar.hidden = false;

//     if (elem == null) {
//       // такое возможно, если курсор мыши "вылетел" за границу окна
//       return null;
//     }

//     return elem.closest('.droppable');
//   }

//   document.onmousemove = onMouseMove;
//   document.onmouseup = onMouseUp;
//   document.onmousedown = onMouseDown;

//   this.onDragEnd = function(dragObject, dropElem) {};
//   this.onDragCancel = function(dragObject) {};

// };


// function getCoords(elem) { // кроме IE8-
//   var box = elem.getBoundingClientRect();

//   return {
//     top: box.top + pageYOffset,
//     left: box.left + pageXOffset
//   };

// }
const PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let storage = {};
// let port = ':3000';
let url = '';

function checkUrl(currentPath) {
  if (window.location.pathname === currentPath) 
    return true;
  else return false;
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  // устанавливает cookie с именем name и значением value
  // options - объект с свойствами cookie (expires, path, domain, secure)
  function setCookie(name, value, options) {
    options = options || {};
  
    var expires = options.expires;
  
    if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }
  
    value = encodeURIComponent(value);
  
    var updatedCookie = name + "=" + value;
  
    for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }
  
    document.cookie = updatedCookie;
  }
  
  // удаляет cookie с именем name
  function deleteCookie(name) {
    setCookie(name, "", {
      expires: -1
    })
  }
if (checkUrl('/account')) {

    Vue.component('user-modal', {
        template: '#user-modal-template'
    })

    var account = new Vue({
        el: '#account',
        data: {
            user_info: [],
            seenEdit: false,
            email: '',
            name: '',
            surname: '',
            sex: '',
            birthday: '',
            phone: '',
            facebook: '',
            vk: '',
            twitter: ''
        },
        created: function(event) {
            fetch('/accountinfo', {
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
                account.user_info = data;

                let formattedDate = new Date(data.birthday).toLocaleString('ru', {day: 'numeric', month: 'numeric', year: 'numeric'});
                account.user_info.birthday = formattedDate;

                let today = new Date();
                let regDate = new Date(account.user_info.regDate);
                let daysOnSite = regDate < today ? Math.abs(Math.ceil((regDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))) : null;
                account.user_info.daysOnSite = daysOnSite;
            });
        },
        methods: {
            calcPercent: function() {
                let all = this.user_info.todosAllCount
                let compl = this.user_info.todosCompletedCount

                if (compl > 0) {
                    return (compl/all * 100).toFixed(2);
                } else return 0;
            },
            formatDate: function() {
                //2018-03-26
                let dateArr = this.user_info.birthday.split('.');
                let dateStr = dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0]

                console.log(dateStr);
                return dateStr;
            },
            submitEdited: function() {
                var vm = this;
                dataObject = Object.keys(this.$data); 
                let userdataFieldsKeys = [];
                for (var key in dataObject) {
                    userdataFieldsKeys[key] = dataObject[key];
                }
                userdataFieldsKeys.splice(0, 2);
                var value = {};
                value = userdataFieldsKeys.reduce(function(acc, current) {
                    value[current] = (vm[current]) ? vm[current] : vm.user_info[current];
                    if (current = "birthday") {
                        value[current] = (vm[current]) ? vm[current] : vm.formatDate();
                    }
                    return value;
                }, {});
                console.log(value);
                if (Object.keys(value).length == 0) {
                    return
                } 
                fetch('/accountinfo', {
                    method: 'PUT',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                })
                .then(function(response) {
                    if (response.status === 200) {
                        window.location = window.location;
                    };
                });
            },
            cancelEdit: function() {
                this.seenEdit = false;
            },
        }
    });   

}

var unauth = {
  template: '<div class="second-nav">' +
    '<a class="header-elem" href="login">Log In</a>' +
    '<a class="header-elem" href="signup">Sign Up</a>' +
    '</div>'
};

var auth = {
  template: '<div class="second-nav">' + 
  '<ul class="header-elem dropable-menu">' + 
  '<li><a href="#!">Menu</a>' + 
  '<ul class="submenu">' + 
     '<li><a href="/account">Account</a></li>' + 
     '<li><a href="/logout">Logout</a></li>' + 
  '</ul>' + 
  '</li>' +
  '</ul>' + 
  '</div>'
}

var accountTemplate = new Vue({
  el: '#account-template',
  data: {
    currentView: unauth,
  },
  created: function() {
    if (getCookie('loggedIn') == 'auth') {
      this.currentView = auth;
    }
  },
  methods: {
    logout: function(event) {
      fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    },
  },
})

if (checkUrl('/logout')) {

  var logout = new Vue({
    el: '#logout',
    created: function() {
      setTimeout(function() {
        fetch('/logout', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(function(response) {
          if (response.status === 200) window.location = '/';
        });  
      }, 5000);
    },
  })

}

if (checkUrl('/')) {

  var homepage = new Vue({
    el: '#homepage',
    data: {
      todoGuideShown: true,
      btnText: 'Close'
    },
    watch: {
      todoGuideShown: function(oldState, newState) {
        if (this.btnText === 'Close') return this.btnText = 'Show'  
        this.btnText = 'Close'
      }
    },
    methods: {
    }
  })

}
if (checkUrl('/login')) {
  let signin = new Vue({
    el: '#signin',
    data: {
      username: '',
      password: '',
      isUsernameValid: '',
      isPasswordValid: '',
      usernameWarn: '',
      passwordWarn: ''
    },
    watch: {
    },
    computed: {
      isValid: function() {
        return (this.isUsernameValid && this.isPasswordValid)
      },
    },
    methods: {
      validateUsername: function() {
        if (this.username === '') {
          this.usernameWarn = 'Username is empty';
          return this.isUsernameValid = false;
        } 
        else {
          this.isUsernameValid = true;
          this.usernameWarn = '';
        }
      },
      validatePassword: function() {
        if (this.password === '') {
          this.passwordWarn = 'Password is empty';
          return this.isPasswordValid = false;
        }
        if (this.password.length < 6) {
          this.passwordWarn = 'Password is less than 6 symbols';
          return this.isPasswordValid = false;
        }
        else {
          this.isPasswordValid = true;
          this.passwordWarn = '';
        }
      },
      validateForm: function(event) {
        this.validateUsername();
        this.validatePassword();
        event.preventDefault();
        if (this.isValid) {
          storage.username = this.username;
          storage.password = this.password;
          fetch(url + '/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(storage),
          })
          .then(function(response) {
            if (response.status === 200) {
              setTimeout(function() {window.location = '/'}, 1000);
            }
          })
          .catch(function(error) {
            console.log(error);   
          })
        } else { }
      },
    }
  });  
}

if (checkUrl('/signup')) {
  let signup = new Vue({
    el: '#signup',
    data: {
      username: '',
      password: '',
      repPassword: '',
      isUsernameValid: '',
      isPasswordValid: '',
      isPasswordMatch: '',
      usernameWarn: '',
      passwordWarn: ''
    },
    watch: {
    },
    computed: {
      isValid: function() {
        return (this.isUsernameValid && this.isPasswordValid && this.isPasswordMatch)
      },
    },
    methods: {
      validateUsername: function() {
        if (this.username === '') {
          this.usernameWarn = 'Username is empty';
          return this.isUsernameValid = false;
        } 
        else {
          this.isUsernameValid = true;
          this.usernameWarn = '';
        }
      },
      validatePassword: function() {
        if (this.password === '') {
          this.passwordWarn = 'Password is empty';
          return this.isPasswordValid = false;
        }
        if (this.password.length < 6) {
          this.passwordWarn = 'Password is less than 6 symbols';
          return this.isPasswordValid = false;
        }
        else {
          this.isPasswordValid = true;
          this.passwordWarn = '';
        }
      },
      matchPassword: function() {
        if (this.password === this.repPassword) this.isPasswordMatch = true
        else this.isPasswordMatch = false
      },
      validateForm: function(event) {
        this.validateUsername();
        this.validatePassword();
        event.preventDefault();       
        if (this.isValid) {
          storage.username = this.username;
          storage.password = this.password;
          fetch(url + '/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(storage)
          })
          .then(function(response) {
            if (response.status === 200) {
              setTimeout(function() {window.location = '/'}, 1000);
            }
          })
        } else { }
      },
    }
  })
}

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
                today = new Date()
                if (Date.parse(finDate) < Date.now()) return 0;

                let formFinDate = new Date(finDate);

                let delta = Math.floor((formFinDate - today) / 1000);
                let days = Math.floor(delta / 86400);
                delta -= days * 86400;
                let hours = Math.floor(delta / 3600) % 24;
                delta -= hours * 3600;
                let minutes = Math.floor(delta / 60) % 60;
                delta -= minutes * 60;
                let seconds = delta % 60;

                hours += days * 24;
                
                return dateStr = hours + ':' + minutes + ':' + seconds;
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
