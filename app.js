$(document).ready(function() {
  addAllTodos(todos,$('.all'));
});

var todos = [];




function addTodo(newTodo) {
  todos.push(newTodo)
}

function getTodos() {
  return todos;
}

function addTodoToDom(todoData, templateStr, $target) {
  var tmpl = _.template(templateStr);
  $target.append(tmpl(todoData));
}

function addAllTodos(arr,$target) {
  $target.html("");
  console.log("ADD ALL TODOS FIRE")
  _.each(arr, function(el,index) {
    el.idx = index;
    addTodoToDom(el,templates.todoPost, $target);
  });
  counter()
}


function getToDoFromDom(text) {
  return {
    content: text,
    completed: false,
  };
}


$('form').on("submit", function(el) {
  el.preventDefault();

  var textOfInput = $('#todoInput').val();
  var newTodo = getToDoFromDom(textOfInput);
  addTodo(newTodo);
  $('#todoInput').val('');
  addAllTodos(todos,$('.all'));
});





// *******************TABS

function toggleComplete(idx) {

  todos[idx].completed = !todos[idx].completed;
}



  $('body').on("click", ".done", function (el,idx) {
    if ($(this).parent().hasClass("completed")) {
      $(this).parent().removeClass("completed")
      $(this).parent().addClass("active")
      $(this).parent().css('textDecoration', 'initial')
      $(this).parent().css('color', 'black')
      toggleComplete($(this).parent().data("todoitem"))
      counter()
    }
    else if($(this).parent().hasClass("active")) {
    $(this).parent().removeClass("active")
    $(this).parent().addClass("completed")
    $(this).parent().css('textDecoration', 'line-through');
    $(this).parent().css('color', 'lightgray')
    toggleComplete($(this).parent().data("todoitem"))
    counter()
    }
});

var result = [];
$(".tabs").on("click", function(event) {
  event.preventDefault()
  console.log($(this).text());
  if ($(this).text() === "Completed") {
    result = todos.filter(function(el,idx) {
      todos[idx].idx = idx;
      return el.completed === true
    });
    console.log(result);
    addAllTodos(result,$('.completed'));
  }
  else if ($(this).text() === "Active") {
    result = todos.filter(function(el,idx) {
      todos[idx].idx = idx;
      return el.completed === false
    });
    addAllTodos(result,$('.active'));
  }
  else {
    addAllTodos(todos,$('.all'))
  }
  $("section").removeClass("show");
  var selector = "." + $(this).attr("rel");
  $(selector).addClass("show");
});

function counter() {
var numItems = todos.filter(function(el){
    return el.completed === false
  }).length;
  if (numItems === 1) {
    $('.activeLength').text(numItems + " item left");
  } else {
    $('.activeLength').text(numItems + " items left");
  }
}


function deleteTodo(idx) {
  todos.splice(idx, 1);
}
$('section').on('click', '.delete', function (event) {
  var idx = $(this).parent().data('todoitem');
  console.log(idx)
  $(this).parent().remove();
  deleteTodo(idx);
});
