//this is the javascript code used for the tasklist. First a variable called todoList is creates which is an aray containing two default tasks.   
var todoList = [{
  'todo': 'Do task 1',
  'id': 'todo0'
}, {
  'todo': 'Do task 2',
  'id': 'todo1'
}];

//variables are then created 
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 10;
var numberOfPages = 0;

function newElement() {
  var inputTitle = document.getElementById('title').value,
    inputUser = document.getElementById('usr').value,
    inputDate = document.getElementById('due-date').value,
    todo = '';
  if (inputTitle === '') {
    alert("Please write a task");
    return;
  } else {
    todo = inputTitle;
    if (inputUser != '') {
      todo = inputTitle + ": " + inputUser + " priority";
    }
    if (inputDate != '') {
      todo = todo + "     nDue: " + inputDate
    }
  }
  var newTodoId = findNextId(),
    newTodo = {
      'todo': todo,
      'id': 'todo' + newTodoId
    };
  todoList.push(newTodo);
  sortElementsById();
  clearFields();
}

// NEWWWW
function colourOfTodo() {
  if (inputUser === "High") {
    document.getElementByClassName("'todo' + newTodoId").style.color = "#f44336";

  }
  if (inputUser === "Medium") {
    document.getElementById("task").style.color = "#f44336";
  }
  if (inputUser === "Low") {
    document.getElementById("task").style.color = "#f44336";
  }
  //DONE

}
function fetchIdFromObj(todo) {
  return parseInt(todo.id.slice(4));
}

function findNextId() {
  if (todoList.length === 0) {
    return 0;
  }
  var lastElementId = fetchIdFromObj(todoList[todoList.length - 1]),
    firstElementId = fetchIdFromObj(todoList[0]);
  return (firstElementId >= lastElementId) ? (firstElementId + 1) : (lastElementId + 1);
}

function clearFields() {
  document.getElementById('title').value = '';
  document.getElementById('usr').value = '';
  document.getElementById('due-date').value = '';
}

function deleteElement(event) {
  var idOfEltToBeDeleted = event.target.parentElement.id;
  var arrayIndex = todoList.findIndex(function(singleTodo) {
    return singleTodo.id === idOfEltToBeDeleted;
  });
  if (arrayIndex !== -1) {
    todoList.splice(arrayIndex, 1);
  }
  load(todoList);
}

function displayOneElement(todoObject) {
  var li_element = document.createElement("li");
  var p_element = document.createElement("p");
  p_element.className = "task-name";
  li_element.appendChild(p_element);
  li_element.setAttribute("id", todoObject.id);
  var text_node = document.createTextNode(todoObject.todo);
  p_element.appendChild(text_node);
  var span_element = document.createElement("SPAN");
  span_element.className = "close";
  var txt_node = document.createTextNode("\u00D7");
  span_element.appendChild(txt_node);
  span_element.onclick = deleteElement;
  li_element.appendChild(span_element);
  document.getElementById("task-list").appendChild(li_element);
}

function sortElementsById() {
  var manyTodos = todoList.sort(function(a, b) {
    var x = fetchIdFromObj(a);
    var y = fetchIdFromObj(b);
    if (x > y) {
      return -1;
    }
    if (x < y) {
      return 1;
    }
    return 0;
  })
  load(manyTodos);
}


function getNumberOfPages(manyTodos) {
  return Math.ceil(manyTodos.length / numberPerPage);
}


function refreshPaginations() {
  var paginationTarget = document.getElementById('pagination'),
    setActiveClass = false;
  paginationTarget.innerHTML = '';
  for (var i = 1; i <= numberOfPages; i++) {
    var li_element = document.createElement("li"),
      a_element = document.createElement('a');
   
    if (i === currentPage) {
      li_element.className = 'active';
      setActiveClass = true;
    } else {
      a_element.onclick = gotoPage;
    }
    a_element.setAttribute('id', i);
    a_element.innerHTML = i;
    li_element.appendChild(a_element);
    paginationTarget.appendChild(li_element);
  }
  if (numberOfPages > 0 && setActiveClass === false) {
    currentPage = 1;
    refreshPaginations();
    loadList(todoList);
  }
}


function loadList(manyTodos) {
  var begin = ((currentPage - 1) * numberPerPage);
  var end = begin + numberPerPage;
  pageList = manyTodos.slice(begin, end);
  refreshPaginations();
  drawList(pageList);
}


function drawList(manyTodos) {
  document.getElementById("task-list").innerHTML = "";
  manyTodos.forEach(function(singleTodo) {
    displayOneElement(singleTodo);
  });
}


function load(manyTodos) {
  numberOfPages = getNumberOfPages(manyTodos);
  loadList(manyTodos);
}

window.onload = function() {
  sortElementsById();
}
