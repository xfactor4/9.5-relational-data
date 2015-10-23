import store from '../store';
import User from './user';
import _ from 'underscore';

var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults() {
    return {
      ingredients: [],
      creator: {toJSON: function() {}}
    }
  },

  parse(response) {
    response.creator = new User(_.omit(response.creator, '__type', 'className'));
    return response;
  },

  toJSON(options) {
    // I'm saving the model
    if(options) {
      return _.extend({}, this.attributes, {
        creator: {
          "__type": "Pointer",
          "className": "_User",
          "objectId": this.get('creator').id
        }
      });
    // I'm using toJSON to get a simple object of attributes
    } else {
      return _.extend({}, this.attributes, {
        creator: this.get('creator').toJSON()
      });
    }
  }
});

export default Recipe;
