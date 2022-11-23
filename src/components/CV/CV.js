import React, { Component } from 'react';
import './CV.css';
import ContactInfo from '../ContactInfo/ContactInfo';
import EducationInfo from '../EducationInfo/EducationInfo';

export default class CV extends Component {
  render() {
    return (
      <div className="cv">
        <ContactInfo />
        <EducationInfo />
      </div>
    );
  }
}
