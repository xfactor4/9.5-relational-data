import React from 'react';
import store from '../store';
import { History } from 'react-router';

const IngredientInput = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    qty: React.PropTypes.number,
    isNew: React.PropTypes.bool,
    onAdd: React.PropTypes.func
  },

  handleAddIngredient(e) {
    e.preventDefault();
    this.props.onAdd({
      name: this.refs.name.value,
      qty: Number(this.refs.qty.value)
    });

    this.refs.name.value = '';
    this.refs.qty.value = '';
  },

  render() {
    return (
      <fieldset>
        <input type="text" placeholder="Ingredient" defaultValue={this.props.name} ref="name" />
        <input type="number" placeholder="Quantity" defaultValue={this.props.qty} ref="qty" />

        {this.props.isNew && <button onClick={this.handleAddIngredient}>+</button>}
      </fieldset>
    );
  }
});

const RecipeForm = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [History],

  getInitialState() {
    return {
      recipe: store.getNewRecipe()
    };
  },

  componentWillMount() {
    if(this.props.params.id) {
      var recipes = store.getRecipesCollection();
      recipes.fetch().then(() => {
        var recipe = recipes.get(this.props.params.id);
        this.setState({
          recipe: recipe
        });
      });
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    store.getRecipesCollection().create({
      name: this.refs.name.value,
      category: this.refs.category.value,
      ingredients: this.state.ingredients,
      creator: store.getSession().get('currentUser')
    }, {wait: true});

    this.refs.name.value = '';
    this.refs.category.value = '';
    this.history.pushState({}, '/');
  },

  handleAddIngredient(ingredient) {
    var ingredients = this.state.recipe.get('ingredients');
    this.state.recipe.set('ingredients', ingredients.concat(ingredient));
    this.forceUpdate();
  },

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <input type="text" placeholder="Name" defaultValue={this.state.recipe.get('name')} ref="name" />
            <input type="text" placeholder="Category" ref="category" />
          </fieldset>

          <fieldset>
            {this.state.recipe.get('ingredients').map((i, index) => <IngredientInput {...i} key={index} />)}
            <IngredientInput isNew onAdd={this.handleAddIngredient} />
          </fieldset>

          <button type="submit">Save</button>
        </form>
    );
  }
});

export default RecipeForm;
