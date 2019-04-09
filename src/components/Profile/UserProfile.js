import React, { Component } from "react";

import { connect } from "react-redux";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Button from '@material-ui/core/Button';
import UpdateUserProfile from "./UpdateUserProfile";
import UserProfileCard from "./UserProfileCard";

import Auth from "../Auth/Auth";

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
    const { loggedInUser } = this.props;
    if (this.state.updatingInfo) {
      return (
        <div style={{margin: "10px"}}>
          <UpdateUserProfile
            loggedInUser={loggedInUser}
            toggleUpdate={this.toggleUpdate}
          />
          <Button 
            variant="outlined"
            onClick={this.toggleUpdate}
            color="secondary"
            style={{margin: "5px"}}
          >
          Cancel
          </Button>
        </div>
      );
    } else {
      return (
        <div style={{margin: "10px"}}>
          <UserProfileCard loggedInUser={loggedInUser} />
          <Button 
            variant="outlined"
            onClick={this.toggleUpdate}
            style={{margin: "5px"}}
          >
          Edit Profile
          </Button>
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
)(Auth(UserProfile));
