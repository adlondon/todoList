$(document).ready(function() {
  addAllTodos(todos,$('.all'));
})


var todos = [
  {
    content: 'I AM TEST',
    completed: false,
  },
  {
    content: 'THIS IS FANTASTIC',
    completed: false
  }
]





// CANT FIGURE OUT HOW TO INCLUDE TEMPLATES
// var templates = {
//   todoItem: [
//     '<div class="todoItem" data-idx ="<%= idx %>">',
//     '<%= todoItem %>',
//     '</div>'
//   ].join('')
// }


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
  _.each(arr, function(el,index) {
    el.idx = index;
    addTodoToDom(el,templates.todoPost, $target);
  });
}

// function addCompletedTodos() {
//   _.each(getTodos(), function (el,index) {
//     el.idx = index;
//     addTodoToDom(el,templates.todoPost, $(".completed"))
//   })
// }
//
// function addActiveTodos() {
//   _.each(getTodos(), function (el,index) {
//     el.idx = index;
//     addTodoToDom(el,templates.todoPost, $(".active"))
//   })
// }

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
  // $('.todoAdded').append("<div class='active' data-todoItem ='<%= idx %>'><input type='checkbox' class='done'/>" + text + "</div>");
  addTodo(newTodo);
  $('#todoInput').val('');
  addAllTodos(todos,$('.all'));
});





// *******************TABS

function toggleComplete(idx) {
  getTodos()[idx].completed = !getTodos()[idx].completed;
}



  $('body').on("click", ".done", function (el,idx) {
    if ($(this).parent().css('textDecoration') == 'line-through') {
      $(this).parent().removeClass("completed")
      $(this).parent().addClass("active")
      $(this).parent().css('textDecoration', 'initial')
      $(this).parent().css('color', 'black')
      toggleComplete($(this).parent().data("todoitem"))

    }
    else {
    $(this).parent().removeClass("active")
    $(this).parent().addClass("completed")
    $(this).parent().css('textDecoration', 'line-through');
    $(this).parent().css('color', 'lightgray')
    toggleComplete($(this).parent().data("todoitem"))
    }
});


//
// var result = []
// $(".active").on("click", function(event) {
//
//   $("section").removeClass("show");
//   $(this).addClass("show");
//   var selector = "." + $(this).attr("rel");
//   $(selector).addClass("show");
// });
//
//
//


var result = []
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
  $("section").removeClass("show");
  $(this).addClass("show");
  var selector = "." + $(this).attr("rel");
  $(selector).addClass("show");
});
