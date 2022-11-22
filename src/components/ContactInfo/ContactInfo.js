import React, { Component } from 'react';
import './ContactInfo.css';
import ContactInfoForm from '../ContactInfoForm/ContactInfoForm';

const FIRST_NAME_ERRORS = Object.freeze({
  isEmpty: 'First name is required',
});

const LAST_NAME_ERRORS = Object.freeze({
  isEmpty: 'Last name is required',
});

const EMAIL_ERRORS = Object.freeze({
  isEmpty: 'Email is required',
  isInvalid: 'Invalid email',
});

const PHONE_ERRORS = Object.freeze({
  isInvalid: 'Invalid format (Example: 123-456-7890)',
});

const PHONE_REGEX = /(\d{3})-\d{3}-\d{4}/;

const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      isEditing: true,

      inputErrors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateBtn = this.handleUpdateBtn.bind(this);
  }

  /**
   * Event handler for input field changes.
   * @param {SyntheticEvent} e
   */
  handleChange(e) {
    this.setState((prevState) => ({
      [e.target.name]: e.target.value,
      inputErrors: {
        ...prevState.inputErrors,
        [e.target.name]: '',
      },
    }));
  }

  /**
   * Event handler for the update button (save/edit).
   */
  handleUpdateBtn() {
    this.setState((prevState) => {
      let { isEditing } = prevState;

      if (!isEditing) {
        // Switch to edit mode
        return { isEditing: !isEditing };
      }

      // Reaching this point means save button was clicked
      // Set up input validation
      const { firstName, lastName, email, phone, inputErrors } = prevState;
      const inputs = Object.entries({ firstName, lastName, email, phone });
      let hasErrors = false;

      // Input validation begins
      inputs.forEach(([input, value]) => {
        if (input === 'firstName') {
          // First name validation
          if (!value) {
            inputErrors[input] = FIRST_NAME_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (input === 'lastName') {
          // Last name validation
          if (!value) {
            inputErrors[input] = LAST_NAME_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (input === 'email') {
          // Email validation
          if (!value) {
            inputErrors[input] = EMAIL_ERRORS.isEmpty;
            hasErrors = true;
          } else if (!EMAIL_REGEX.test(value)) {
            inputErrors[input] = EMAIL_ERRORS.isInvalid;
            hasErrors = true;
          }
        } else if (input === 'phone') {
          // Phone validation
          if (value && !PHONE_REGEX.test(value)) {
            inputErrors[input] = PHONE_ERRORS.isInvalid;
            hasErrors = true;
          }
        }
      });

      if (!hasErrors) {
        isEditing = false;
      }

      return { isEditing, inputErrors };
    });
  }

  render() {
    const { firstName, lastName, email, phone, isEditing, inputErrors } = this.state;

    return (
      <div className="contact-info">
        {/* Title bar */}
        <div className="contact-info__title-bar">
          <span className="contact-info__title">Contact Information</span>
          <button className="update-btn" type="button" onClick={this.handleUpdateBtn}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        {isEditing ? (
          /* Form for editing contact info */
          <ContactInfoForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            phone={phone}
            handleChange={this.handleChange}
            inputErrors={inputErrors}
          />
        ) : (
          /* Read-only contact info */
          <div className="contact-info__info-display">
            <div className="contact-info__text-group">
              <span className="contact-info__text-title">First name:</span>
              <span className="contact-info__text-content">{firstName}</span>
            </div>
            <div className="contact-info__text-group">
              <span className="contact-info__text-title">Last name:</span>
              <span className="contact-info__text-content">{lastName}</span>
            </div>
            <div className="contact-info__text-group">
              <span className="contact-info__text-title">Email:</span>
              <span className="contact-info__text-content">{email}</span>
            </div>
            <div className="contact-info__text-group">
              <span className="contact-info__text-title">Phone:</span>
              <span className="contact-info__text-content">{phone}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
