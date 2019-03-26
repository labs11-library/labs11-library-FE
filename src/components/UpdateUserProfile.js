import React, { Component } from "react";

class UpdateUserProfile extends Component {
  constructor(props) {
    super(props);
    const { firstName, lastName, email, bio } = this.props.loggedInUser;
    this.state = {
      firstName,
      lastName,
      email,
      bio
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="bio"
          value={this.state.bio}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default UpdateUserProfile;
