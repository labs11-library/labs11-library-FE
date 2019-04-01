import React, { Component } from "react";

import { connect } from "react-redux";
import { getLoggedInUser } from "../redux/actions/authActions.js";

import UpdateUserProfile from "./UpdateUserProfile";
import UserProfileCard from "./UserProfileCard";
class UserProfile extends Component {
  state = {
    updatingInfo: false
  };
  componentDidMount() {
    this.props.getLoggedInUser();
  }
  toggleUpdate = e => {
    this.setState(prevState => {
      return {
        updatingInfo: !prevState.updatingInfo
      };
    });
  };
  render() {
    console.log(localStorage);
    const { loggedInUser } = this.props;
    if (this.state.updatingInfo) {
      return (
        <div>
          <h1>Update profile</h1>
          <UpdateUserProfile
            loggedInUser={loggedInUser}
            toggleUpdate={this.toggleUpdate}
          />
          <button onClick={this.toggleUpdate}>Cancel Update</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Profile</h1>
          <UserProfileCard loggedInUser={loggedInUser} />
          <button onClick={this.toggleUpdate}>Update Info</button>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  loggedInUser: state.authReducer.loggedInUser,
  loading: state.authReducer.fetchingUser
});

export default connect(
  mapStateToProps,
  { getLoggedInUser }
)(UserProfile);
