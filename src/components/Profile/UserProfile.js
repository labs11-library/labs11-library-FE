import React, { Component } from "react";

import { connect } from "react-redux";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Button from "@material-ui/core/Button";
import UpdateUserProfile from "./UpdateUserProfile";
import UserProfileCard from "./UserProfileCard";
import TransactionsComponent from "./Transactions";
import { ProfileWrapper } from "../Styles/UserProfileStyles";

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
  logOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  render() {
    const { loggedInUser } = this.props;
    if (this.state.updatingInfo) {
      return (
        <div style={{ margin: "5vw auto auto auto" }}>
          <UpdateUserProfile
            loggedInUser={loggedInUser}
            toggleUpdate={this.toggleUpdate}
          />
          <Button
            variant="outlined"
            onClick={this.toggleUpdate}
            color="secondary"
            style={{ margin: "5px" }}
          >
            Cancel
          </Button>
        </div>
      );
    } else {
      return (
        <ProfileWrapper>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <UserProfileCard loggedInUser={loggedInUser} />

            <Button
              variant="contained"
              onClick={this.toggleUpdate}
              style={{ margin: "5px", width: "100%", maxWidth: "200px" }}
              color="primary"
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              onClick={this.logOut}
              style={{ margin: "5px", width: "100%", maxWidth: "200px" }}
              color="secondary"
            >
              Log out
            </Button>
          </div>

          <div>
            <TransactionsComponent />
          </div>
        </ProfileWrapper>
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
