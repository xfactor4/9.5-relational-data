import $ from 'jquery';
import Backbone from 'backbone';

import Session from './models/session';
import Recipe from './models/recipe';
import RecipesCollection from './models/recipes-collection';
import FoodCollection from './models/food-collection';

let session, recipes, food;
export default {
  getSession(){
    return (session = session || new Session())
  },

  getRecipesCollection() {
    return (recipes = recipes || new RecipesCollection())
  },

  getFoodCollection() {
    return (food = food || new FoodCollection())
  },

  getNewRecipe() {
    return new Recipe();
  }
};
