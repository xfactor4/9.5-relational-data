import React from 'react';
import store from '../store';
import Recipe from '../models/recipe';
import CommentsCollection from '../models/comments-collection';

const ShowRecipe = React.createClass({
  getInitialState() {
    return {};
  },

  componentWillMount() {
    var recipeId = this.props.params.id;

    var recipe = new Recipe({objectId: recipeId});
    recipe.fetch().then(() => this.setState({recipe: recipe}));

    var comments = new CommentsCollection({recipeId: recipeId});
    comments.fetch().then(() => this.setState({comments: comments}));
  },

  render() {
    let recipe = (this.state.recipe && this.state.recipe.toJSON()) || {};
    let comments = (this.state.comments && this.state.comments.toJSON()) || [];
    return (
      <div>
        <h1>{recipe.name}</h1>
        <ul>
          {comments.map((c) => <li key={c.objectId}>{c.text}</li> )}
        </ul>
      </div>
    )
  }
});

export default ShowRecipe;
