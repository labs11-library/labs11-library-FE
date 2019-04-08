import React, { Component } from "react";

import { connect } from "react-redux";
import { editProfile } from "../../redux/actions/authActions.js";
class UpdateUserProfile extends Component {
  constructor(props) {
    super(props);
    const { firstName, lastName, email, bio, userId } = this.props.loggedInUser;
    this.state = {
      firstName,
      lastName,
      email,
      bio,
      userId,
      latitude: null,
      longitude: null
    };
  }
  componentWillReceiveProps(newProps) {
    if (this.props.loggedInUser !== newProps.loggedInUser) {
      this.props.toggleUpdate();
    }
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  editProfile = e => {
    e.preventDefault();
    this.props.editProfile(this.state);
  };
  changeLocation = e => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      this.props.editProfile({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
    console.log(this.props.loggedInUser);
  };
  render() {
    return (
      <form>
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
        <button onClick={this.editProfile}>Save Updates</button>
        <button onClick={this.changeLocation}>
          Update your location to your current location!
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.authReducer.fetchingUser,
  loggedInUser: state.authReducer.loggedInUser
});
export default connect(
  mapStateToProps,
  { editProfile }
)(UpdateUserProfile);
