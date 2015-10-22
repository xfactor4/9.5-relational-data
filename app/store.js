import $ from 'jquery';
import Backbone from 'backbone';

import Session from './models/session';
import Recipe from './models/recipe';
import RecipesCollection from './models/recipes-collection';

let session, recipes;
export default {
  getSession(){
    return (session = session || new Session())
  },

  getRecipesCollection() {
    return (recipes = recipes || new RecipesCollection())
  },

  getNewRecipe() {
    return new Recipe();
  }
};
