import Recipe from './recipe';

var RecipesCollection = Backbone.Collection.extend({
  model: Recipe,
  url: "https://api.parse.com/1/classes/Recipe",
  parse(response) {
    return response.results;
  }
});

export default RecipesCollection;
