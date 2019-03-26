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
    e.preventDefault();
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
          <UpdateUserProfile loggedInUser={loggedInUser} />
          <button onClick={this.toggleUpdate}>Cancel Update</button>
        </div>
      );
    } else {
      return (
        <div>
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
