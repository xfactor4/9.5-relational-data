import React from 'react';
import store from '../store';

var Index = React.createClass({
  propTypes: {
    recipes: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      recipes: store.getRecipesCollection()
    }
  },

  componentWillMount() {
    this.props.recipes.fetch();
    this.props.recipes.on('sync add remove', this.forceUpdate.bind(this, null), this);
  },

  componentWillUnmount() {
    this.props.recipes.off('sync add remove', null, this);
  },

  render() {
    var recipes = this.props.recipes.toJSON();
    return (
      <div>
        <h1>Index</h1>
        <ul>
          {recipes.map((r) => {
            return (<li key={r.objectId}>{r.name} - ({r.creator.username})</li>);
          })}
        </ul>
      </div>
    );
  }

});

export default Index;
