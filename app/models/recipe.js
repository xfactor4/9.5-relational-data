import store from '../store';
import User from './user';
import _ from 'underscore';

var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: "https://api.parse.com/1/classes/Recipe",

  url: function() {
    var base = _.result(this, 'urlRoot');
    if (this.isNew()) return base;
    var id = this.get(this.idAttribute);
    return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id) + "?include=creator";
  },

  defaults() {
    return {
      ingredients: [],
      creator: {toJSON: function() {}}
    }
  },

  parse(response) {
    response.creator = new User(_.omit(response.creator, '__type', 'className'), {parse: true});
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
