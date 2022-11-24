import React, { Component } from 'react';
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

export default class WorkInfoForm extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date().toISOString();

    this.state = {
      company: '',
      position: '',
      startDate: currentDate.substring(0, currentDate.indexOf('T')),
      endDate: currentDate.substring(0, currentDate.indexOf('T')),
      description: '',
      isEditing: true,
      inputErrors: {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
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
    const { removeWork, id } = this.props;
    removeWork(id);
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
      const { company, position, startDate, endDate, inputErrors } = prevState;
      const inputErrorsCopy = { ...inputErrors };
      const inputs = Object.entries({ company, position, startDate, endDate });
      let hasErrors = false;

      // Input validation begins
      inputs.forEach(([input, value]) => {
        if (input === 'company') {
          // Company name validation
          if (!value) {
            inputErrorsCopy[input] = COMPANY_NAME_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (input === 'position') {
          // Position title validation
          if (!value) {
            inputErrorsCopy[input] = POSITION_TITLE_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (input === 'startDate') {
          // Start date validation
          if (!value) {
            inputErrorsCopy[input] = START_DATE_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (input === 'endDate') {
          // End date validation
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
    const { company, position, startDate, endDate, description, isEditing, inputErrors } =
      this.state;

    const classNames = {
      company: 'work-info__input work-info__input_company',
      position: 'work-info__input work-info__input_position',
      startDate: 'work-info__input work-info__input_start-date',
      endDate: 'work-info__input work-info__input_end-date',
      description: 'work-info__input work-info__input_description',
    };

    if (inputErrors.company) classNames.company += ' work-info__input_error';
    if (inputErrors.position) classNames.position += ' work-info__input_error';
    if (inputErrors.startDate) classNames.startDate += ' work-info__input_error';
    if (inputErrors.endDate) classNames.endDate += ' work-info__input_error';
    if (inputErrors.description) classNames.description += ' work-info__input_error';

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
                value={company}
                required
                onChange={this.handleChange}
                autoComplete="off"
              />
            ) : (
              <span className="work-info__text-content">{company}</span>
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
                value={position}
                required
                onChange={this.handleChange}
                autoComplete="off"
              />
            ) : (
              <span className="work-info__text-content">{position}</span>
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
                value={startDate}
                required
                onChange={this.handleChange}
                autoComplete="off"
              />
            ) : (
              <span className="work-info__text-content">{new Date(startDate).toDateString()}</span>
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
                value={endDate}
                required
                onChange={this.handleChange}
                autoComplete="off"
                min={startDate}
              />
            ) : (
              <span className="work-info__text-content">{new Date(endDate).toDateString()}</span>
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
                value={description}
                onChange={this.handleChange}
                autoComplete="off"
              />
            ) : (
              <span className="work-info__text-content">{description}</span>
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
            <button className="work-info__delete-btn" type="button" onClick={this.handleDeleteBtn}>
              Delete
            </button>
          ) : null}

          {/* Save/edit button */}
          <button className="work-info__update-btn" type="button" onClick={this.handleUpdateBtn}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </form>
    );
  }
}

WorkInfoForm.propTypes = {
  id: PropTypes.string.isRequired,
  removeWork: PropTypes.func.isRequired,
};
