import React, { useState, useCallback } from 'react';
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

const PHONE_REGEX = /^(\d{3})-\d{3}-\d{4}$/;

const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default function ContactInfo() {
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [isEditing, setIsEditing] = useState(true);

  const [inputErrors, setInputErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  /**
   * Event handler for input field changes.
   * @param {SyntheticEvent} e
   */
  const handleChange = useCallback(
    (e) => {
      setFields({
        ...fields,
        [e.target.name]: e.target.value,
      });

      setInputErrors({
        ...inputErrors,
        [e.target.name]: '',
      });
    },
    [fields, inputErrors]
  );

  /**
   * Event handler for the update button (save/edit).
   */
  function handleUpdateBtn() {
    const newInputErrors = { ...inputErrors };
    let newIsEditing = isEditing;
    let hasErrors = false;

    if (isEditing) {
      Object.entries(fields).forEach(([field, value]) => {
        if (field === 'firstName') {
          // First name validation
          if (!value) {
            newInputErrors[field] = FIRST_NAME_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (field === 'lastName') {
          // Last name validation
          if (!value) {
            newInputErrors[field] = LAST_NAME_ERRORS.isEmpty;
            hasErrors = true;
          }
        } else if (field === 'email') {
          // Email validation
          if (!value) {
            newInputErrors[field] = EMAIL_ERRORS.isEmpty;
            hasErrors = true;
          } else if (!EMAIL_REGEX.test(value)) {
            newInputErrors[field] = EMAIL_ERRORS.isInvalid;
            hasErrors = true;
          }
        } else if (field === 'phone') {
          // Phone validation
          if (value && !PHONE_REGEX.test(value)) {
            newInputErrors[field] = PHONE_ERRORS.isInvalid;
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
    <div className="contact-info">
      {/* Title bar */}
      <div className="contact-info__title-bar">
        <span className="contact-info__title">Contact Information</span>
        <button className="contact-info__update-btn" type="button" onClick={handleUpdateBtn}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Form for editing contact info */}
      <ContactInfoForm
        firstName={fields.firstName}
        lastName={fields.lastName}
        email={fields.email}
        phone={fields.phone}
        handleChange={handleChange}
        isEditing={isEditing}
        inputErrors={inputErrors}
      />
    </div>
  );
}
