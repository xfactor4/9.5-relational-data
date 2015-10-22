import React from 'react';
import { Link, IndexLink } from 'react-router';

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    return (
      <div>
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1><IndexLink to="/">Home</IndexLink></h1>
            </li>
          </ul>

          <section className="top-bar-section">
            {/* Left Nav Section */}
            <ul className="left">
              <li><Link to="/create">Create</Link></li>
            </ul>
          </section>
        </nav>

        {this.props.children}
      </div>
    );
  }

});

export default App;
