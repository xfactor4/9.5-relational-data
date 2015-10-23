import Comment from './comment';

var CommentsCollection = Backbone.Collection.extend({
  model: Comment,
  url: "https://api.parse.com/1/classes/Comment?include=creator,recipe",
  parse(response) {
    return response.results;
  }
});

export default CommentsCollection;
