import React from 'react';
import PropTypes from 'prop-types';
import './ContactInfoForm.css';

export default function ContactInfoForm(props) {
  const { firstName, lastName, email, phone, handleChange, isEditing, inputErrors } = props;

  const classNames = {
    firstName: 'contact-info__input contact-info__input_first-name',
    lastName: 'contact-info__input contact-info__input_email',
    email: 'contact-info__input contact-info__input_email',
    phone: 'contact-info__input contact-info__input_phone',
  };

  if (inputErrors.firstName) classNames.firstName += ' contact-info__input_error';
  if (inputErrors.lastName) classNames.lastName += ' contact-info__input_error';
  if (inputErrors.email) classNames.email += ' contact-info__input_error';
  if (inputErrors.phone) classNames.phone += ' contact-info__input_error';

  return (
    <form className="contact-info__form">
      <div className="contact-info__wrapper contact-info__wrapper_first-name">
        <label className="contact-info__label contact-info__label_first-name">
          First name
          {isEditing ? (
            <input
              className={classNames.firstName}
              name="firstName"
              type="text"
              value={firstName}
              required
              onChange={handleChange}
              autoComplete="off"
            />
          ) : (
            <span className="contact-info__text-content">{firstName}</span>
          )}
        </label>
        <div className="contact-info__error contact-info__error_first-name">
          {inputErrors.firstName || null}
        </div>
      </div>

      <div className="contact-info__wrapper contact-info__wrapper_last-name">
        <label className="contact-info__label contact-info__label_last-name">
          Last name
          {isEditing ? (
            <input
              className={classNames.lastName}
              name="lastName"
              type="text"
              value={lastName}
              required
              onChange={handleChange}
              autoComplete="off"
            />
          ) : (
            <span className="contact-info__text-content">{lastName}</span>
          )}
        </label>
        <div className="contact-info__error contact-info__error_last-name">
          {inputErrors.lastName || null}
        </div>
      </div>

      <div className="contact-info__wrapper contact-info__wrapper_email">
        <label className="contact-info__label contact-info__label_email">
          Email
          {isEditing ? (
            <input
              className={classNames.email}
              name="email"
              type="email"
              value={email}
              required
              onChange={handleChange}
              autoComplete="off"
            />
          ) : (
            <span className="contact-info__text-content">{email}</span>
          )}
        </label>
        <div className="contact-info__error contact-info__error_email">
          {inputErrors.email || null}
        </div>
      </div>

      <div className="contact-info__wrapper contact-info__wrapper_phone">
        <label className="contact-info__label contact-info__label_phone">
          <div>
            Phone <span className="contact-info__optional-text">(Optional)</span>
          </div>

          {isEditing ? (
            <input
              className={classNames.phone}
              name="phone"
              type="tel"
              value={phone}
              required
              onChange={handleChange}
              autoComplete="off"
              placeholder="123-456-7890"
            />
          ) : (
            <span className="contact-info__text-content">{phone}</span>
          )}
        </label>
        <div className="contact-info__error contact-info__error_phone">
          {inputErrors.phone || null}
        </div>
      </div>
    </form>
  );
}

ContactInfoForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  inputErrors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};
