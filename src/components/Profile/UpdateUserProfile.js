import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { editProfile } from "../../redux/actions/authActions.js";
import styled from "styled-components";

const FormWrapper = styled.form`
  width: 95%;
  max-width: 600px;
  margin: 0 auto;
`;
const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;
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
      this.props.editProfile({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  };
  render() {
    return (
      <FormWrapper>
        <NameWrapper>
          <TextField
            type="text"
            label="First name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            style={{ width: "49%" }}
          />
          <TextField
            type="text"
            label="Last name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            style={{ width: "49%" }}
          />
        </NameWrapper>
        <TextField
          type="email"
          label="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          style={{ width: "100%", marginBottom: "5px" }}
        />
        <TextField
          type="text-area"
          label="Bio"
          name="bio"
          multiline
          fullWidth
          value={this.state.bio}
          onChange={this.handleChange}
          // style={{ padding: "5px" }}
        />
        <Button
          variant="contained"
          onClick={this.editProfile}
          style={{ margin: "5px" }}
          color="primary"
        >
          Save Updates
        </Button>
        <Button
          variant="outlined"
          onClick={this.changeLocation}
          style={{ margin: "5px" }}
          color="primary"
        >
          Update your location
        </Button>
        {/* </div> */}
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
