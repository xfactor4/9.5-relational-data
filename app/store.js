import $ from 'jquery';
import Backbone from 'backbone';

let collection;
export default {
  getCollection() {
    return (collection = collection || new Backbone.Collection());
  }
};
