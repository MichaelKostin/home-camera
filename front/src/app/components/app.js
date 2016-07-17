'use strict';

import React from 'react';
import { Component } from 'react';
import { Link, IndexLink } from 'react-router';

const active = {
  background: '#009688'
};


export default class App extends React.Component {

  render() {
    return (
      <div>
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
        <nav>
          <IndexLink activeStyle={active} to="/">home</IndexLink>
          <Link activeStyle={active} to="images">images</Link>
          <Link activeStyle={active} to="videos">videos</Link>
        </nav>
        <div className="content">
          {this.props.children}
        </div>

        <footer>

        </footer>
      </div>
    )
  }
};
