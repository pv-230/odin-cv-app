import React, { Component } from 'react';
import './ContactInfo.css';

export default class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { firstname, lastname, email, phone } = this.state;

    return (
      <div className="contact-info">
        <h2 className="contact-info__title">Contact Information</h2>
        <form className="contact-info__form">
          <div className="firstname-info">
            <label className="firstname-info__label" htmlFor="firstname-info__input">
              First name:
              <input
                id="firstname-info__input"
                name="firstname"
                type="text"
                value={firstname}
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="lastname-info">
            <label className="lastname-info__label" htmlFor="lastname-info__input">
              Last name:
              <input
                id="lastname-info__input"
                name="lastname"
                type="text"
                value={lastname}
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="email-info">
            <label className="email-info__label" htmlFor="email-info__input">
              Email:
              <input
                id="email-info__input"
                name="email"
                type="email"
                value={email}
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="phone-info">
            <label className="phone-info__label" htmlFor="phone-info__input">
              Phone:
              <input
                id="phone-info__input"
                name="phone"
                type="tel"
                value={phone}
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
        </form>
      </div>
    );
  }
}
