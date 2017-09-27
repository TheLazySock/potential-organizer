document.getElementById('input').addEventListener('keypress', function (e) {
  var value = this.value;
  if (e.code === 'Enter' && value) {
    addItem(value);
  }
});

function addItem(value) {
  var li = document.createElement("li");
  var input = document.getElementById("input").value;
  var text = document.createTextNode(input);

  li.appendChild(text);
  document.getElementById("todo").appendChild(li);
  document.getElementById("input").value = "";

  var span = document.createElement("SPAN");
  var crossSymbol = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(crossSymbol);
  li.appendChild(span);

  for(i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var hide = this.parentElement;
      hide.style.display = "none";
    }
  }

  for(j = 0; j < li.length; i++) {
    var serialLI = JSON.stringify(li);
    localStorage.setItem(i, serialLI);
  }
}

var todoList = document.querySelector("ul");
todoList.addEventListener("click", function(event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
  }
});

var list = document.getElementsByTagName("LI");
var i;
for (i = 0; i < list.length; i++) {
  var span = document.createElement("SPAN");
  var crossSymbol = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(crossSymbol);
  list[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var hide = this.parentElement;
    hide.style.display = "none";
  }
}
