import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { editProfile } from "../../redux/actions/authActions.js";
import styled from "styled-components";

const FormWrapper = styled.form`
  width: 400px;
`

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
      <FormWrapper>
        <div>
          <TextField
            type="text"
            label="First name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            style={{padding: "5px"}}
          />
          <TextField
            type="text"
            label="Last name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            style={{padding: "5px"}}
          />
        </div>
        <div>
          <TextField
            type="email"
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            style={{padding: "5px"}}
          />
        </div>
        <div>
          <TextField
            type="text-area"
            label="Bio"
            name="bio"
            multiline
            fullWidth
            value={this.state.bio}
            onChange={this.handleChange}
            style={{padding: "5px"}}
          />
        </div>
        <div>
          <Button 
            variant="outlined" 
            onClick={this.editProfile}
            style={{margin: "5px"}}
          >
            Save Updates
          </Button>
          <Button 
            variant="outlined" 
            onClick={this.changeLocation}
            style={{margin: "5px"}}
          >
            Update your location
          </Button>
        </div>
      </FormWrapper>
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
