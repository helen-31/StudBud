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

// function which inputds the title of the new element with its due date and priority. if the user doesnt input a task an alert happens and if they do then the last is displayed in the new element
function newElement() {
  var inputTitle = document.getElementById('title').value,
    inputLevel = document.getElementById('usr').value,
    inputDate = document.getElementById('due-date').value,
    todo = '';
  if (inputTitle === '') {
    alert("Please write a task");
    return;
  } else {
    todo = inputTitle;
    if (inputLevel != '') {
      todo = inputTitle + ": " + inputLevel + " priority";
    }
    if (inputDate != '') {
      todo = todo + "     Due: " + inputDate
    }
  }

  // variable called new todo is created with function which redefines the id as the previous todo plus the newtodoID and then uses the push command to create the new task (newToDo) which will have its ID as well
  var newTodoId = findNextId(),
    newTodo = {
      'todo': todo,
      'id': 'todo' + newTodoId
    };
  todoList.push(newTodo);
  sortElementsById();
  clearFields();
}

//the parseint parses a value as a string and returns the first integer
function fetchIdFromObj(todo) {
  return parseInt(todo.id.slice(4));
}

//if the array contains no elements then there are no IDs. It then creates a variable called lastemlementid which is defined by the last element in the array. and the firstelementid which is the first. 
function findNextId() {
  if (todoList.length === 0) {
    return 0;
  }
  var lastElementId = fetchIdFromObj(todoList[todoList.length - 1]),
    firstElementId = fetchIdFromObj(todoList[0]);
  return (firstElementId >= lastElementId) ? (firstElementId + 1) : (lastElementId + 1);
}

// reset the values of title usr and due-date to nothing
function clearFields() {
  document.getElementById('title').value = '';
  document.getElementById('usr').value = '';
  document.getElementById('due-date').value = '';
}

// uses the splice function to remove one element from the array index. 
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

// 
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

// a function to sort the todos by using if statements to sort them based off the value of their ID. 
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

// using the list with id pagnation from the html and creates a for loop which createds the same number of elements as there are pages. if i is equivalent to the current page then that class is is deemed "active". if the jnumber of pages is greater than 0  and the set active class is false (i isnt equivalent to current page) then current page becomes 1 and the function if run and todolist is loaded
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

//this loads the list and creates two variable to represent the begining and end of the list and then uses the array slice to present an array with the begin variable and the end variable  
function loadList(manyTodos) {
  var begin = ((currentPage - 1) * numberPerPage);
  var end = begin + numberPerPage;
  pageList = manyTodos.slice(begin, end);
  refreshPaginations();
  drawList(pageList);
}

// the drawlist is created by drawing on the task-list to display the single todos  
function drawList(manyTodos) {
  document.getElementById("task-list").innerHTML = "";
  manyTodos.forEach(function(singleTodo) {
    displayOneElement(singleTodo);
  });
}

// the function load manytodos redefines numberofpages using the function getnumberofpages from the manytodos and then loads that list
function load(manyTodos) {
  numberOfPages = getNumberOfPages(manyTodos);
  loadList(manyTodos);
}

window.onload = function() {
  sortElementsById();
}
