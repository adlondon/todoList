var templates = {};

// templates.todoPost = [
//     '<div class="todoItem" data-idx ="<%= idx %>">',
//     '<%= content %>',
//     '</div>'
//   ].join("");

templates.todoPost = [
  "<% if(completed) { %> ",
  "<div class='completed'",
  "<% } else {%>",
  "<div class='active'",
  "<% } %>",
  "data-todoitem ='<%= idx %>'><input type='checkbox' class='done'/>",
  "<%= content %>",
  "</div>"
].join("")



// "<div class='active' data-todoItem ='<%= idx %>'><input type='checkbox' class='done'/>" + text + "</div>"
