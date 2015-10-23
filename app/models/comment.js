import store from '../store';
import _ from 'underscore';
import User from './user';
import Recipe from './recipe';

/*

comments.create({
  text: "Hello",
  creator: store.getSession().get('currentUser'),
  recipe: recipe
});

 */

const Comment = Backbone.Model.extend({

  idAttribute: 'objectId',

  default() {
    return {
      recipe: {toJSON: ()=>{}},
      creator: {toJSON: ()=>{}}
    };
  },

  parse(response) {
    response.creator = new User(_.omit(response.creator, '__type', 'className'), {parse: true});
    response.recipe = new Recipe(_.omit(response.recipe, '__type', 'className'), {parse: true});
    return response;
  },

  toJSON(options) {
    // I'm saving the model
    if(options) {

      return _.extend({}, this.attributes, {
        recipe: {
          "__type": "Pointer",
          "className": "Recipe",
          "objectId": this.get('recipe').id
        },
        creator: {
          "__type": "Pointer",
          "className": "_User",
          "objectId": this.get('creator').id
        }
      });

    // I'm using toJSON to get a simple object of attributes
    } else {

      return _.extend({}, this.attributes, {
        recipe: this.get('recipe').toJSON(),
        creator: this.get('creator').toJSON()
      });

    }
  }
});

export default Comment;
