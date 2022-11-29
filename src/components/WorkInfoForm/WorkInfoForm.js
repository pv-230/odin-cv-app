import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WorkInfoForm.css';

const COMPANY_NAME_ERRORS = Object.freeze({
  isEmpty: 'Company name is required',
});

const POSITION_TITLE_ERRORS = Object.freeze({
  isEmpty: 'Position title is required',
});

const START_DATE_ERRORS = Object.freeze({
  isEmpty: 'Start date is required',
});

const END_DATE_ERRORS = Object.freeze({
  isEmpty: 'End date is required',
});

export default function WorkInfoForm(props) {
  const currentDate = new Date().toISOString();

  const [fields, setFields] = useState({
    company: '',
    position: '',
    startDate: currentDate.substring(0, currentDate.indexOf('T')),
    endDate: currentDate.substring(0, currentDate.indexOf('T')),
    description: '',
  });

  const [isEditing, setIsEditing] = useState(true);

  const [inputErrors, setInputErrors] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const classNames = {
    company: 'work-info__input work-info__input_company',
    position: 'work-info__input work-info__input_position',
    startDate: 'work-info__input work-info__input_start-date',
    endDate: 'work-info__input work-info__input_end-date',
    description: 'work-info__input work-info__input_description',
  };

  // Adds an error class to any field that needs it
  if (inputErrors.company) classNames.company += ' work-info__input_error';
  if (inputErrors.position) classNames.position += ' work-info__input_error';
  if (inputErrors.startDate) classNames.startDate += ' work-info__input_error';
  if (inputErrors.endDate) classNames.endDate += ' work-info__input_error';
  if (inputErrors.description) classNames.description += ' work-info__input_error';

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
   * Event handler for deleting a work experience.
   */
  function handleDeleteBtn() {
    const { removeWork, id } = props;
    removeWork(id);
  }

  /**
   * Event handler for saving/editing a work experience.
   */
  function handleUpdateBtn() {
    const newInputErrors = { ...inputErrors };
    let newIsEditing = isEditing;
    let hasErrors = false;

    if (isEditing) {
      Object.entries(fields).forEach(([field, value]) => {
        if (field === 'company') {
          // School name validation
          if (!value) {
            newInputErrors[field] = COMPANY_NAME_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (field === 'position') {
          // Degree name validation
          if (!value) {
            newInputErrors[field] = POSITION_TITLE_ERRORS.isEmpty;
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
    <form className="work-info__form">
      {/* Company info */}
      <div className="work-info__wrapper work-info__wrapper_company">
        <label className="work-info__label work-info__label_company">
          Company
          {isEditing ? (
            <input
              className={classNames.company}
              name="company"
              type="text"
              value={fields.company}
              required
              onChange={handleChange}
              autoComplete="off"
            />
          ) : (
            <span className="work-info__text-content">{fields.company}</span>
          )}
        </label>
        <div className="work-info__error work-info__error_company">
          {inputErrors.company || null}
        </div>
      </div>

      {/* Position info */}
      <div className="work-info__wrapper work-info__wrapper_position">
        <label className="work-info__label work-info__label_position">
          Position title
          {isEditing ? (
            <input
              className={classNames.position}
              name="position"
              type="text"
              value={fields.position}
              required
              onChange={handleChange}
              autoComplete="off"
            />
          ) : (
            <span className="work-info__text-content">{fields.position}</span>
          )}
        </label>
        <div className="work-info__error work-info__error_position">
          {inputErrors.position || null}
        </div>
      </div>

      {/* Start date info */}
      <div className="work-info__wrapper work-info__wrapper_start-date">
        <label className="work-info__label work-info__label_start-date">
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
            <span className="work-info__text-content">
              {new Date(fields.startDate).toDateString()}
            </span>
          )}
        </label>
        <div className="work-info__error work-info__error_start-date">
          {inputErrors.startDate || null}
        </div>
      </div>

      {/* End date info */}
      <div className="work-info__wrapper work-info__wrapper_end-date">
        <label className="work-info__label work-info__label_end-date">
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
            <span className="work-info__text-content">
              {new Date(fields.endDate).toDateString()}
            </span>
          )}
        </label>
        <div className="work-info__error work-info__error_end-date">
          {inputErrors.endDate || null}
        </div>
      </div>

      {/* Description info */}
      <div className="work-info__wrapper work-info__wrapper_description">
        <label className="work-info__label work-info__label_description">
          <div>
            Work description <span className="work-info__optional-text">(Optional)</span>
          </div>
          {isEditing ? (
            <textarea
              className={classNames.description}
              name="description"
              value={fields.description}
              onChange={handleChange}
              autoComplete="off"
            />
          ) : (
            <span className="work-info__text-content">{fields.description}</span>
          )}
        </label>
        <div className="work-info__error work-info__error_description">
          {inputErrors.description || null}
        </div>
      </div>

      {/* Form action bar */}
      <div className="work-info__action-bar">
        {/* Delete button */}
        {isEditing ? (
          <button className="work-info__delete-btn" type="button" onClick={handleDeleteBtn}>
            Delete
          </button>
        ) : null}

        {/* Save/edit button */}
        <button className="work-info__update-btn" type="button" onClick={handleUpdateBtn}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </form>
  );
}

WorkInfoForm.propTypes = {
  id: PropTypes.string.isRequired,
  removeWork: PropTypes.func.isRequired,
};
