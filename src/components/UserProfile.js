import React, { Component } from "react";

import { connect } from "react-redux";
import { getFirstUser } from "../redux/actions";

import UpdateUserProfile from "./UpdateUserProfile";
import UserProfileCard from "./UserProfileCard";
class UserProfile extends Component {
  state = {
    updatingInfo: false
  };
  componentDidMount() {
    this.props.getFirstUser();
  }
  toggleUpdate = e => {
    this.setState(prevState => {
      return {
        updatingInfo: !prevState.updatingInfo
      };
    });
  };
  render() {
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
  loggedInUser: state.loggedInUser,
  loading: state.loading
});

export default connect(
  mapStateToProps,
  { getFirstUser }
)(UserProfile);
