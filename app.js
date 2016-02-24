var todos = []




// CANT FIGURE OUT HOW TO INCLUDE TEMPLATES
var templates = {
  todoItem: [
    '<div class="todoItem">',
    '<%= todoItem %>',
    '</div>'
  ].join('')
}


function addTodo(newTodo) {
  todos.push(newTodo)
}

function addTodoToDom(todoData, templateStr, $target) {
  var tmpl = _.template(templateStr);
  $target.append(tmpl(todoData));
}

function addAllTodos(arr) {
  _.each(getTodos(), function (el, idx) {
    el.idx = idx;
    addTodoToDom(el,templates.todo, $(".all"))
  });
}

function getToDoFromDom () {
  var content = $('input[name="todoInput"]').val();
  return {
    content: content,
    completed: false
  };
}


$('#todoInput').on("keypress", function(el) {

  if (el.keyCode === 13) {
      el.preventDefault();
  var text = $('#todoInput').val();
  $('.todoAdded').append("<div class='active'><input type='checkbox' class='done'/>" + text + "</div>");
  var newTodo = getToDoFromDom();
  addTodo(newTodo);
  console.log(todos)
  $('#todoInput').val('');
}
});





// *******************TABS




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
