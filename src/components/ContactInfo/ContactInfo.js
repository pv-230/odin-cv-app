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

    // Checks for empty input fields and updates error state
    this.setState((prevState) => {
      const { inputErrors } = prevState;
      const inputErrorsCopy = { ...inputErrors };
      inputs.forEach((input) => {
        if (!prevState[input]) {
          inputErrorsCopy[input].isEmpty = !prevState[input];
        }
      });
      return { inputErrorsCopy };
    });
  }

  render() {
    const { firstName, lastName, email, phone, isEditing, inputErrors } = this.state;

    return (
      <div className="contact-info">
        <div className="contact-info__title-bar">
          <h2 className="contact-info__title">Contact Information</h2>
          <button className="update-btn" type="button" onClick={this.handleUpdateBtn}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <ContactInfoForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          handleChange={this.handleChange}
          inputErrors={inputErrors}
        />
      </div>
    );
  }
}
