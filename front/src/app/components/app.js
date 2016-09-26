'use strict';

import React, { PropTypes } from 'react';
import { Component } from 'react';
import { Link, IndexLink } from 'react-router';

const active = {
  background: '#009688'
};

class Header extends React.Component {
  render () {
    return (
      <header>
        <ul className="colors">
          <li className="indigo"></li>
          <li className="green"></li>
          <li className="orange"></li>
          <li className="pink"></li>
          <li className="blue"></li>
          <li className="light-green"></li>
          <li className="deep-orange"></li>
        </ul>
        <h2><span>H</span>ome camcorder</h2>
        <ul className="colors">
          <li className="deep-orange"></li>
          <li className="light-green"></li>
          <li className="blue"></li>
          <li className="pink"></li>
          <li className="orange"></li>
          <li className="green"></li>
          <li className="indigo"></li>
        </ul>
      </header>
    );
  }
}

const App = ({ children, errors })=> (
      <div>
        <Header/>
        <nav>
          <IndexLink activeStyle={active} to="/">home</IndexLink>
          <Link activeStyle={active} to="/images">images</Link>
          <Link activeStyle={active} to="/videos">videos</Link>
        </nav>
        <div className="content">
          { children }
        </div>

        <footer>
          {errors.map((error, index) => (<div key={index} className="error"><h3>Error</h3><p>{error.message}</p></div>))}
        </footer>
      </div>
);

App.PropTypes =  {
  children: PropTypes.node.isRequired
};

export default App;
