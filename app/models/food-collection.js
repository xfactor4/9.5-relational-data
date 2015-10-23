import Recipe from './recipe';

var FoodCollection = Backbone.Collection.extend({
  model: Recipe,
  url: "https://api.parse.com/1/classes/Recipe?where=" + JSON.stringify({
    category: {
      $in: ["Food"]
    }
  }),
  parse(response) {
    return response.results;
  }
});

export default FoodCollection;
