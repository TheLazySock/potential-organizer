var data;
if (localStorage.getItem('todoList')) {
  data = JSON.parse(localStorage.getItem('todoList'));
} else {
  todo: [],
  completed: [];
}

renderTodoList();

document.getElementById('input').addEventListener('keypress', function (e) {
  var value = this.value;
  if (e.code === 'Enter' && value) {
    addItem(value);
  }
});

addItemToDOM(value, isCompleted) {
  var list
  if (completed) {
    document.getElementById('completed')''
  } else {
    document.getElementById('todo');
  }

  var item = document.createElement('LI');
  item.innerText = text;

  var buttons = document.createElement('DIV');
  buttons.classList.add('buttons');

  var remove = document.createElement('BUTTON');
  remove.classList.add('remove');
  
}

function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemToDOM(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemToDOM(value, true);
  }
}
