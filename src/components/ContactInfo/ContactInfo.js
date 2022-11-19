import React, { Component } from 'react';
import './ContactInfo.css';
import ContactInfoForm from '../ContactInfoForm/ContactInfoForm';

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
        firstName: {
          isEmpty: false,
        },
        lastName: {
          isEmpty: false,
        },
        email: {
          isEmpty: false,
        },
        phone: {
          isEmpty: false,
        },
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
        [e.target.name]: {
          ...prevState.inputErrors[e.target.name],
          isEmpty: false, // Clears errors for any changed input field
        },
      },
    }));
  }

  /**
   * Event handler for the update button (save/edit).
   */
  handleUpdateBtn() {
    const inputs = ['firstName', 'lastName', 'email', 'phone'];
    let hasErrors = false;

    this.setState((prevState) => {
      let { isEditing } = prevState;

      if (isEditing) {
        const { inputErrors } = prevState;

        // Checks for any errors with the input fields
        inputs.forEach((input) => {
          // Checks for empty input fields
          if (!prevState[input]) {
            inputErrors[input].isEmpty = !prevState[input];
            hasErrors = true;
          }
        });

        if (!hasErrors) {
          isEditing = false;
        }

        return { isEditing, inputErrors };
      }

      return { isEditing: !isEditing };
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
