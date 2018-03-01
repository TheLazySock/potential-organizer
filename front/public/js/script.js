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
var accountTemplate = new Vue({
    el: '#account-template',
    data: {
      currentView: 'unauth'
    },
    created: function() {
      // fetch('/', {
      //   credentials: 'include'
      // })
      // .then(function(res) {
      //   // this.currentView = 'auth';
      //   return res.json();
      // })
      // fetch('/login', {
      //   method: 'GET',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Cookie': 'loggedIn'
      //   },
      // })
      // .then(function(response) {
      //   this.currentView = 'auth';
      // });
      // .then(function(response) {
      //   return response.json
      // })
      // .then(function(myJson) {
      //   console.log(myJson);
      // });
      // console.log('111');
      // if (this.currentView === 'unauth') this.currentView = 'auth'
      // else this.currentView = 'unauth';
    },
    components: {
      unauth: { 
          template: '<div class="second-nav">' + 
            '<a class="header-elem" href="login.html">Log In</a>' + 
            '<a class="header-elem" href="signup.html">Sign Up</a>' + 
            '</div>'
        },
      auth: {
          template: '<div class="second-nav">' + 
            '<a href="account.html" class="header-elem">Account</a>' + 
            '</div>'
        }
    }
  })
// const PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// let storage = {};
// // let port = ':3000';
// let url = '';

let signin = new Vue({
  el: '#signin',
  data: {
    email: '',
    password: '',
  },
  computed: {
    validEmail: function() {
      return PATTERN.test(this.email)
    },
    emptyPassword: function() {
      return this.password === ''
    },
    isValid: function() {
      if (!this.validEmail ||
        this.emptyPassword) {
        return false;
      } else return true;
    },
  },
  methods: {
    validateForm: function(event) {
      event.preventDefault();
      if (this.isValid) {
        storage.email = this.email;
        storage.password = this.password;
        fetch(url + '/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(storage),
        })
        setTimeout(function() {window.location = 'index.html'}, 1000);
      } else { }
    },
  }
});

// const PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// let storage = {};
// // let port = ':3000';
// let url = '';

let signup = new Vue({
  el: '#signup',
  data: {
    email: '',
    username: '',
    name: '',
    surname: '',
    password: '',
    repPassword: '',
  },
  computed: {
    validEmail: function() {
      return PATTERN.test(this.email)
    },
    validName: function() {
      return this.name !== ''
    },
    validSurname: function() {
      return this.surname !== ''
    },
    validUsername: function() {
      return this.username !== ''
    },
    validPassword: function() {
      return this.password === this.repPassword
    },
    emptyPassword: function() {
      return this.password === ''
    },
    isValid: function() {
      if (!this.validEmail ||
        !this.validName ||
        !this.validSurname ||
        !this.validUsername ||
        !this.validPassword ||
        this.emptyPassword) {
        return false;
      } else return true;
    },
  },
  methods: {
    validateForm: function(event) {
			event.preventDefault();
      if (this.isValid) {
        this.formValid = true;
        storage.email = this.email;
        storage.name = this.name;
        storage.surname = this.surname;
        storage.username = this.username;
        storage.password = this.password;
        fetch(url + '/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(storage)
        })
				setTimeout(function() {window.location = 'index.html'}, 1000);
      } else { }
    },
  }
})

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