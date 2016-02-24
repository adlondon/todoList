function addListItem () {
  var text = $('#todoInput').val();
  $('.todoAdded').append('<div class="todoItem">' + text + '</div>');
  $('#todoInput').val('');
}


$(function() {
  $('#todoInput').on("change", addListItem);
})
