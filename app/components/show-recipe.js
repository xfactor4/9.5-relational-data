import React from 'react';
import store from '../store';
import Recipe from '../models/recipe';
import CommentsCollection from '../models/comments-collection';
import { History } from 'react-router';

const ShowRecipe = React.createClass({
  mixins: [History],

  getInitialState() {
    return {
      isEditing: false
    };
  },

  componentWillMount() {
    let recipeId = this.props.params.id;

    let recipe = new Recipe({objectId: recipeId});
    recipe.fetch().then(() => this.setState({recipe: recipe}));

    let comments = new CommentsCollection({recipeId: recipeId});
    comments.fetch().then(() => this.setState({comments: comments}));
  },

  handleEdit() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  },

  handleSave(e) {
    e.preventDefault();
    this.state.recipe.set({
      name: this.refs.name.value
    });

    this.state.recipe.save();

    this.setState({
      isEditing: false
    });
  },

  handleDestroy(e) {
    e.preventDefault();
    if(confirm("Are you sure?")){
      this.state.recipe.destroy();
      this.history.replaceState(null, '/');
    }
  },

  render() {
    let recipe = (this.state.recipe && this.state.recipe.toJSON()) || {};
    let comments = (this.state.comments && this.state.comments.toJSON()) || [];
    let content;
    if(this.state.isEditing) {
      content = (
        <form>
          <input type="text" defaultValue={recipe.name} ref="name" />
          <button type="submit" onClick={this.handleSave}>Save</button>
        </form>
      );
    } else {
      content = (
        <div>
          <h1>{recipe.name}</h1>
          <button onClick={this.handleEdit}>Edit</button>
          <button className="alert" onClick={this.handleDestroy}>Destroy</button>
          <ul>
            {comments.map((c) => <li key={c.objectId}>{c.text}</li> )}
          </ul>
        </div>
      );
    }
    return content;
  }
});

export default ShowRecipe;
