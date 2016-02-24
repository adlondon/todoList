$(document).ready(function() {
  addAllTodos();
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

function addAllTodos() {
  _.each(getTodos(), function(el,index) {
    el.idx = index;
    addTodoToDom(el,templates.todoPost, $(".all"))
  });
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
  // $('.todoAdded').append("<div class='active' data-todoItem ='<%= idx %>'><input type='checkbox' class='done'/>" + text + "</div>");
  addTodo(newTodo);
  $('#todoInput').val('');
  addAllTodos();
});





// *******************TABS


todos.filter(function(el) {
  return el.completed === false
});

  $('body').on("click", ".done", function (el) {
    if ($(this).parent().css('textDecoration') == 'line-through') {
      $(this).parent().removeClass("completed")
      $(this).parent().addClass("active")
      $(this).parent().css('textDecoration', 'none')
      $(this).parent().css('color', 'black')
    }
    else {
    $(this).parent().removeClass("active")
    $(this).parent().addClass("completed")
    $(this).parent().css('textDecoration', 'line-through');
    $(this).parent().css('color', 'lightgray')
    }
});

$(".tabs").on("click", function(event) {
  event.preventDefault();
  $("section").removeClass("show");
  $(this).addClass("show");
  var selector = "." + $(this).attr("rel");
  $(selector).addClass("show");
});
