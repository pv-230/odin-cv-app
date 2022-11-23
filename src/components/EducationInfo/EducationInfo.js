import React, { Component } from 'react';
import './EducationInfo.css';
import EducationInfoForm from '../EducationInfoForm/EducationInfoForm';

export default class EducationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educations: [],
    };
    this.handleAddEducation = this.handleAddEducation.bind(this);
  }

  /**
   * Event handler for adding a new education.
   */
  handleAddEducation() {
    this.setState((prevState) => {
      const { educations } = prevState;
      const newEducation = {
        id: crypto.randomUUID(),
      };
      return { educations: [...educations, newEducation] };
    });
  }

  render() {
    const { educations } = this.state;

    return (
      <div className="education-info">
        <div className="education-info__title-bar">Education</div>
        {educations.map((education) => (
          <EducationInfoForm key={education.id} />
        ))}
        <button
          className="education-info__add-btn"
          type="button"
          onClick={this.handleAddEducation}
        >
          Add education
        </button>
      </div>
    );
  }
}
