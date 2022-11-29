import React, { useState } from 'react';
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

export default function EducationInfoForm(props) {
  const currentDate = new Date().toISOString();

  const [fields, setFields] = useState({
    school: '',
    degree: '',
    startDate: currentDate.substring(0, currentDate.indexOf('T')),
    endDate: currentDate.substring(0, currentDate.indexOf('T')),
  });

  const [isEditing, setIsEditing] = useState(true);

  const [inputErrors, setInputErrors] = useState({
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
  });

  const classNames = {
    school: 'education-info__input education-info__input_school',
    degree: 'education-info__input education-info__input_degree',
    startDate: 'education-info__input education-info__input_start-date',
    endDate: 'education-info__input education-info__input_end-date',
  };

  // Adds an error class to any field that needs it
  if (inputErrors.school) classNames.school += ' education-info__input_error';
  if (inputErrors.degree) classNames.degree += ' education-info__input_error';
  if (inputErrors.startDate) classNames.startDate += ' education-info__input_error';
  if (inputErrors.endDate) classNames.endDate += ' education-info__input_error';

  /**
   * Event handler for input field changes.
   * @param {SyntheticEvent} e
   */
  function handleChange(e) {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });

    setInputErrors({
      ...inputErrors,
      [e.target.name]: '',
    });
  }

  /**
   * Event handler for deleting an education.
   */
  function handleDeleteBtn() {
    const { removeEducation, id } = props;
    removeEducation(id);
  }

  /**
   * Event handler for saving/editing an education.
   */
  function handleUpdateBtn() {
    const newInputErrors = { ...inputErrors };
    let newIsEditing = isEditing;
    let hasErrors = false;

    if (isEditing) {
      Object.entries(fields).forEach(([field, value]) => {
        if (field === 'school') {
          // School name validation
          if (!value) {
            newInputErrors[field] = SCHOOL_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (field === 'degree') {
          // Degree name validation
          if (!value) {
            newInputErrors[field] = DEGREE_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (field === 'startDate') {
          // Start date validation
          if (!value) {
            newInputErrors[field] = START_DATE_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (field === 'endDate') {
          // End date validation
          if (!value) {
            newInputErrors[field] = END_DATE_ERRORS.isEmpty;
            hasErrors = true;
          }
        }
      });

      if (!hasErrors) newIsEditing = false;
    } else {
      newIsEditing = true;
    }

    setInputErrors(newInputErrors);
    setIsEditing(newIsEditing);
  }

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
              value={fields.school}
              required
              onChange={handleChange}
              autoComplete="off"
            />
          ) : (
            <span className="education-info__text-content">{fields.school}</span>
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
              value={fields.degree}
              required
              onChange={handleChange}
              autoComplete="off"
            />
          ) : (
            <span className="education-info__text-content">{fields.degree}</span>
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
              value={fields.startDate}
              required
              onChange={handleChange}
              autoComplete="off"
              max={fields.endDate}
            />
          ) : (
            <span className="education-info__text-content">
              {new Date(fields.startDate).toDateString()}
            </span>
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
              value={fields.endDate}
              required
              onChange={handleChange}
              autoComplete="off"
              min={fields.startDate}
            />
          ) : (
            <span className="education-info__text-content">
              {new Date(fields.endDate).toDateString()}
            </span>
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
          <button className="education-info__delete-btn" type="button" onClick={handleDeleteBtn}>
            Delete
          </button>
        ) : null}

        {/* Save/edit button */}
        <button className="education-info__update-btn" type="button" onClick={handleUpdateBtn}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </form>
  );
}

EducationInfoForm.propTypes = {
  id: PropTypes.string.isRequired,
  removeEducation: PropTypes.func.isRequired,
};
