$(document).ready(function() {
  addAllTodos(todos);
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

function addAllTodos(arr) {
  $('.all').html('');
  _.each(arr, function(el,index) {
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



// $('form').on("submit", function(el) {
//   el.preventDefault();
//
//   var textOfInput = $('#todoInput').val();
//   var newTodo = getToDoFromDom(textOfInput);
//   // $('.todoAdded').append("<div class='active' data-todoItem ='<%= idx %>'><input type='checkbox' class='done'/>" + text + "</div>");
//   addTodo(newTodo);
//   $('#todoInput').val('');
//   addAllTodos();
// });

 // $('.todoAdded').append("<div class='active'><input type='checkbox' class='done'/>" + text + "</div>");
 // var newTodo = getToDoFromDom();
 // addTodo(newTodo);
 // console.log(todos)
 // $('#todoInput').val('');

// *******************TABS

// function getFilter(arr) {
//   var result = [];
//   if ($('.show').text() === "Active") {
//     result = arr.filter(function(el, idx, arr){
//       arr[idx].idx = idx;
//       return el.completed === false
//     });
//   } else if ($('.todoMenuActive').text() === "Completed") {
//     result = arr.filter(function(el, idx, arr){
//       arr[idx].idx = idx;
//       return el.completed === true
//     })
//   } else {
//     result = arr;
//   }
  // return result;
  function todoFilter() {
todos.filter(function(el) {
  return el.completed === false
});
}
function toggleComplete(idx) {
  getTodos()[idx].completed = !getTodos()[idx].completed;
}
  $('body').on("click", ".done", function (event) {
    var idx = parseInt($(this).closest('div').data('todoitem'));
    toggleComplete(idx);
    console.log("index", idx);
    if (!getTodos()[idx].completed) {

      $(this).parent().removeClass("completed")
      $(this).parent().addClass("active")
      // $(this).parent().css('textDecoration', 'none')
      // $(this).parent().css('color', 'black')


      console.log(todos[idx].completed);

    }
    else {
    $(this).parent().removeClass("active")
    $(this).parent().addClass("completed")
    // $(this).parent().css('textDecoration', 'line-through');
    // $(this).parent().css('color', 'lightgray')
    console.log("todos should be here", todos[idx].completed);

    }
});
var result = [];
$(".tabs").on("click", function(event) {
  event.preventDefault();
  // $("section").removeClass("show");
  // $(this).addClass("show");
  // var selector = "." + $(this).attr("rel");
  // $(selector).addClass("show");
  if ($(this).text() === "Active") {
    console.log("ACTIVE CLICKED", $(this))
    result = todos.filter(function(el,idx) {
      todos[idx].idx = idx; // ********Brandon helped me with this
      return el.completed === false
    });
    console.log(result);

  }
  else if($(this).text() === "Completed") {
    console.log("completed CLICKED", $(this))
    result = todos.filter(function(el,idx) {
      todos[idx].idx = idx;
      return el.completed === true
    })
    console.log(result);
    }
  else if($(this).text() === "All"){
    console.log("all CLICKED", $(this))
    result = todos
  }
  addAllTodos(result);

});
