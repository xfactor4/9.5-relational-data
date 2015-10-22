import store from '../store';

var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults() {
    return {
      ingredients: [],
      creator: {
        "__type": "Pointer",
        "className": "_User",
        "objectId": store.getSession().get('currentUser').id
      }
    }
  }
});

export default Recipe;
