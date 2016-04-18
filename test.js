var page = {
  init: function () {
    page.initEvents();
    page.initStyling();
  },
// CLICK AND HOVER EVENTS
  initEvents: function () {

    $('form').on("submit", onEnter);
    $('body').on("click", ".done", checkClick);
    $(".tabs").on("click", tabClick);
  },
  onEnter: function(el) {
    el.preventDefault();
    var textOfInput = $('#todoInput').val();
    var newTodo = getToDoFromDom(textOfInput);
    addTodo(newTodo);
    $('#todoInput').val('');
    addAllTodos(todos,$('.all'));
  },
  checkClick: function (el,idx) {
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
},
tabClick: function(event) {
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
},
// *********** PAGELOAD EVENTS
  initStyling: function () {

// this is important
  addAllTodos(todos,$('.all'));


    function addAllTodos(arr,$target) {
      $target.html("");
      console.log("ADD ALL TODOS FIRE")
      _.each(arr, function(el,index) {
        el.idx = index;
        addTodoToDom(el,templates.todoPost, $target);
      });
      counter()
    }

    function toggleComplete(idx) {

      todos[idx].completed = !todos[idx].completed;
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
  function getToDoFromDom(text) {
    return {
      content: text,
      completed: false,
    };
  }
},
};







$(document).ready(function() {

  page.init();
});

var todos = [];
var result = [];















// *******************TABS
