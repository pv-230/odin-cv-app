import React, { Component } from 'react';
import './CV.css';
import ContactInfo from '../ContactInfo/ContactInfo';

export default class CV extends Component {
  render() {
    return (
      <div className="cv">
        <ContactInfo />
      </div>
    );
  }
}
