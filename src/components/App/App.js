import React, { Component } from 'react';
import './reset.css';
import './App.css';
import CV from '../CV/CV';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <CV />
      </div>
    );
  }
}
