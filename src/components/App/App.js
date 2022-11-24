import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Main />
      </div>
    );
  }
}
