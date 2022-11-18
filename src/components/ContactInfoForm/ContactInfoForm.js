import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ContactInfoForm.css';

export default class ContactInfoForm extends Component {
  render() {
    const { firstName, lastName, email, phone, handleChange } = this.props;

    return (
      <form className="contact-info__form">
        <label htmlFor="contact-info__first-name-input">
          First name:
          <input
            id="contact-info__first-name-input"
            name="firstName"
            type="text"
            value={firstName}
            required
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <label htmlFor="contact-info__last-name-input">
          Last name:
          <input
            id="contact-info__last-name-input"
            name="lastName"
            type="text"
            value={lastName}
            required
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <label htmlFor="contact-info__email-input">
          Email:
          <input
            id="contact-info__email-input"
            name="email"
            type="email"
            value={email}
            required
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <label htmlFor="contact-info__phone-input">
          Phone:
          <input
            id="contact-info__phone-input"
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
};
