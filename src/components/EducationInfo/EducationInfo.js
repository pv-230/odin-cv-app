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
    this.removeEducation = this.removeEducation.bind(this);
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

  removeEducation(id) {
    this.setState((prevState) => ({
      ...prevState,
      educations: prevState.educations.filter((education) => education.id !== id),
    }));
  }

  render() {
    const { educations } = this.state;

    return (
      <div className="education-info">
        <div className="education-info__title-bar">Education</div>
        {educations.map((education) => (
          <EducationInfoForm
            key={education.id}
            id={education.id}
            removeEducation={this.removeEducation}
          />
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
