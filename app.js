var todos = []





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

function getToDoFromDom () {
  var content = $('input[name="todoInput"]').val();
  return {
    content: content,
  };
}

function addTodoItem (el) {
  el.preventDefault();
  var text = $('#todoInput').val();
  $('.todoAdded').append("<div><input type='checkbox' class='done'/>" + text + "</div>");
  $('#todoInput').val('');
  var newTodo = getToDoFromDom();
  addTodo(newTodo);
  console.log(todos)
};

function finishItem () {
  if ($(this).parent().css('textDecoration') == 'line-through') {
    $(this).parent().css('textDecoration', 'none')
  }
  else {
  $(this).parent().css('textDecoration', 'line-through');
  $(this).parent().css('fontColor', 'lightgray')

}
};

$(function() {
  $('#todoInput').on("change", addTodoItem);
  $('body').on("click", ".done", finishItem);
});

$(".tabs").on("click", function(event) {
  event.preventDefault();
  $("section").removeClass("show");
  $(this).addClass("show");
  var selector = "." + $(this).attr("rel");
  $(selector).addClass("show");
});
