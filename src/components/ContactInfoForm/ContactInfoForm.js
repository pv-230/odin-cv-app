import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ContactInfoForm.css';

export default class ContactInfoForm extends Component {
  render() {
    const { firstName, lastName, email, phone, handleChange, inputErrors } = this.props;
    const inputClass = 'contact-info__input';
    let firstNameClasses = 'contact-info__input_first-name';
    let lastNameClasses = 'contact-info__input_last-name';
    let emailClasses = 'contact-info__input_email';
    let phoneClasses = 'contact-info__input_phone';

    Object.keys(inputErrors).forEach((input) => {
      if (Object.values(inputErrors[input]).find((value) => value)) {
        // Adds error styling to any input field with an error
        if (input === 'firstName') {
          firstNameClasses += ' contact-info__input_error';
        } else if (input === 'lastName') {
          lastNameClasses += ' contact-info__input_error';
        } else if (input === 'email') {
          emailClasses += ' contact-info__input_error';
        } else if (input === 'phone') {
          phoneClasses += ' contact-info__input_error';
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (input === 'firstName') {
          firstNameClasses.replace(' contact-info__input_error', '');
        } else if (input === 'lastName') {
          lastNameClasses.replace(' contact-info__input_error', '');
        } else if (input === 'email') {
          emailClasses.replace(' contact-info__input_error', '');
        } else if (input === 'phone') {
          phoneClasses.replace(' contact-info__input_error', '');
        }
      }
    });

    return (
      <form className="contact-info__form">
        <label>
          First name:
          <input
            className={`${inputClass} ${firstNameClasses}`}
            name="firstName"
            type="text"
            value={firstName}
            required
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <label>
          Last name:
          <input
            className={`${inputClass} ${lastNameClasses}`}
            name="lastName"
            type="text"
            value={lastName}
            required
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <label>
          Email:
          <input
            className={`${inputClass} ${emailClasses}`}
            name="email"
            type="email"
            value={email}
            required
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <label>
          Phone:
          <input
            className={`${inputClass} ${phoneClasses}`}
            name="phone"
            type="tel"
            value={phone}
            required
            onChange={handleChange}
            autoComplete="off"
          />
        </label>
      </form>
    );
  }
}

ContactInfoForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputErrors: PropTypes.shape({
    firstName: PropTypes.shape({
      isEmpty: PropTypes.bool,
    }),
    lastName: PropTypes.shape({
      isEmpty: PropTypes.bool,
    }),
    email: PropTypes.shape({
      isEmpty: PropTypes.bool,
    }),
    phone: PropTypes.shape({
      isEmpty: PropTypes.bool,
    }),
  }).isRequired,
};
