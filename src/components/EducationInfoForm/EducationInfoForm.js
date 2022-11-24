import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EducationInfoForm.css';

const SCHOOL_ERRORS = Object.freeze({
  isEmpty: 'School name is required',
});

const DEGREE_ERRORS = Object.freeze({
  isEmpty: 'Degree name is required',
});

const START_DATE_ERRORS = Object.freeze({
  isEmpty: 'Start date is required',
});

const END_DATE_ERRORS = Object.freeze({
  isEmpty: 'End date is required',
});

export default class EducationInfoForm extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date().toISOString();

    this.state = {
      school: '',
      degree: '',
      startDate: currentDate.substring(0, currentDate.indexOf('T')),
      endDate: currentDate.substring(0, currentDate.indexOf('T')),
      isEditing: true,
      inputErrors: {
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
    this.handleUpdateBtn = this.handleUpdateBtn.bind(this);
  }

  handleChange(e) {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      inputErrors: {
        ...prevState.inputErrors,
        [e.target.name]: '',
      },
    }));
  }

  handleDeleteBtn() {
    const { removeEducation, id } = this.props;
    removeEducation(id);
  }

  handleUpdateBtn() {
    this.setState((prevState) => {
      const { isEditing } = prevState;
      let isEditingCopy = isEditing;

      if (!isEditingCopy) {
        // Switch to edit mode
        return { isEditing: !isEditingCopy };
      }

      // Reaching this point means save button was clicked
      // Set up input validation
      const { school, degree, startDate, endDate, inputErrors } = prevState;
      const inputErrorsCopy = { ...inputErrors };
      const inputs = Object.entries({ school, degree, startDate, endDate });
      let hasErrors = false;

      // Input validation begins
      inputs.forEach(([input, value]) => {
        if (input === 'school') {
          // School name validation
          if (!value) {
            inputErrorsCopy[input] = SCHOOL_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (input === 'degree') {
          // Degree name validation
          if (!value) {
            inputErrorsCopy[input] = DEGREE_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (input === 'startDate') {
          // Start date validation
          if (!value) {
            inputErrorsCopy[input] = START_DATE_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (input === 'endDate') {
          // Phone validation
          if (!value) {
            inputErrorsCopy[input] = END_DATE_ERRORS.isEmpty;
            hasErrors = true;
          }
        }
      });

      if (!hasErrors) {
        isEditingCopy = false;
      }

      return { isEditing: isEditingCopy, inputErrors: inputErrorsCopy };
    });
  }

  render() {
    const { school, degree, startDate, endDate, isEditing, inputErrors } = this.state;

    const classNames = {
      school: 'education-info__input education-info__input_school',
      degree: 'education-info__input education-info__input_degree',
      startDate: 'education-info__input education-info__input_start-date',
      endDate: 'education-info__input education-info__input_end-date',
    };

    if (inputErrors.school) classNames.school += ' education-info__input_error';
    if (inputErrors.degree) classNames.degree += ' education-info__input_error';
    if (inputErrors.startDate) classNames.startDate += ' education-info__input_error';
    if (inputErrors.endDate) classNames.endDate += ' education-info__input_error';

    return (
      <form className="education-info__form">
        {/* School info */}
        <div className="education-info__wrapper education-info__wrapper_school">
          <label className="education-info__label education-info__label_school">
            School
            {isEditing ? (
              <input
                className={classNames.school}
                name="school"
                type="text"
                value={school}
                required
                onChange={this.handleChange}
                autoComplete="off"
              />
            ) : (
              <span className="education-info__text-content">{school}</span>
            )}
          </label>
          <div className="education-info__error education-info__error_school">
            {inputErrors.school || null}
          </div>
        </div>

        {/* Degree info */}
        <div className="education-info__wrapper education-info__wrapper_degree">
          <label className="education-info__label education-info__label_degree">
            Degree
            {isEditing ? (
              <input
                className={classNames.degree}
                name="degree"
                type="text"
                value={degree}
                required
                onChange={this.handleChange}
                autoComplete="off"
              />
            ) : (
              <span className="education-info__text-content">{degree}</span>
            )}
          </label>
          <div className="education-info__error education-info__error_degree">
            {inputErrors.degree || null}
          </div>
        </div>

        {/* Start date info */}
        <div className="education-info__wrapper education-info__wrapper_start-date">
          <label className="education-info__label education-info__label_start-date">
            Start date
            {isEditing ? (
              <input
                className={classNames.startDate}
                name="startDate"
                type="date"
                value={startDate}
                required
                onChange={this.handleChange}
                autoComplete="off"
              />
            ) : (
              <span className="education-info__text-content">{startDate}</span>
            )}
          </label>
          <div className="education-info__error education-info__error_start-date">
            {inputErrors.startDate || null}
          </div>
        </div>

        {/* End date info */}
        <div className="education-info__wrapper education-info__wrapper_end-date">
          <label className="education-info__label education-info__label_end-date">
            End date
            {isEditing ? (
              <input
                className={classNames.endDate}
                name="endDate"
                type="date"
                value={endDate}
                required
                onChange={this.handleChange}
                autoComplete="off"
                min={startDate}
              />
            ) : (
              <span className="education-info__text-content">{endDate}</span>
            )}
          </label>
          <div className="education-info__error education-info__error_end-date">
            {inputErrors.endDate || null}
          </div>
        </div>

        {/* Form action bar */}
        <div className="education-info__action-bar">
          {/* Delete button */}
          {isEditing ? (
            <button
              className="education-info__delete-btn"
              type="button"
              onClick={this.handleDeleteBtn}
            >
              Delete
            </button>
          ) : null}

          {/* Save/edit button */}
          <button
            className="education-info__update-btn"
            type="button"
            onClick={this.handleUpdateBtn}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </form>
    );
  }
}

EducationInfoForm.propTypes = {
  id: PropTypes.string.isRequired,
  removeEducation: PropTypes.func.isRequired,
};
