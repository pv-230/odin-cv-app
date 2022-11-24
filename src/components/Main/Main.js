import React, { Component } from 'react';
import './Main.css';
import CV from '../CV/CV';

export default class Main extends Component {
  render() {
    return (
      <main className="main">
        <CV />
      </main>
    );
  }
}
