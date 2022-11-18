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
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { firstName, lastName, email, phone, isEditing } = this.state;

    return (
      <div className="contact-info">
        <div className="contact-info__title-bar">
          <h2 className="contact-info__title">Contact Information</h2>
          <button className="contact-info__update-btn" type="button">
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <ContactInfoForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}
