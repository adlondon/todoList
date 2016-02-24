
var posts = [
  {
    title: "Hello world",
    content: "This is amazing!!!!!"
  },
  {
    title: "So you're saying there's a chance!",
    content: "I love this quote!!!!!"
  }
];

var templates = {
  post: [
    "<article data-idx='<%= idx %>'>",
       "<h2><%= title %></h2>",
       "<p><%= content %></p>",
       "<button class='delete'>delete</button>"
  ].join("")
}

function getPosts() {
  return posts;
}
function addPost(newPost) {
  posts.push(newPost);
}
function deletePost(idx) {
  posts.splice(idx, 1);
}
function editPost(idx) {
  // fill in.
}

function addPostToDom(postData) {
    var tmpl = _.template(templates.post);
    $('section').append(tmpl(postData));
}

// addPostToDom({title: "some title", content: "some content"}, templates.posts, $('aside'))

function addAllPosts() {
  $('section').html('');
  _.each(getPosts(), function (el, idx) {
    el.idx = idx;
    addPostToDom(el);
  })
}
function getPostFromDom() {
  var title = $('input[name="title"]').val();
  var content = $('input[name="content"]').val();;
  return {
    title: title,
    content: content
  }
