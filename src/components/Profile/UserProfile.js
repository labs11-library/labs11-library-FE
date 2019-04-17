import React, { Component } from "react";

import { connect } from "react-redux";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Button from "@material-ui/core/Button";
import UpdateUserProfile from "./UpdateUserProfile";
import UserProfileCard from "./UserProfileCard";
import {
  UserProfileCardShadow,
  ProfileWrapper,
  ButtonWrapper
} from "../Styles/UserProfileCardStyles";

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
        <React.Fragment>
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
        </React.Fragment>
      );
    } else {
      return (
        <UserProfileCardShadow>
          <ProfileWrapper>
            <UserProfileCard loggedInUser={loggedInUser} />
            <ButtonWrapper>
              <Button
                variant="contained"
                onClick={this.toggleUpdate}
                style={{ margin: "5px", width: "50%", maxWidth: "200px" }}
                color="primary"
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                onClick={this.logOut}
                style={{ margin: "5px", width: "50%", maxWidth: "200px" }}
                color="secondary"
              >
                Log out
              </Button>
            </ButtonWrapper>
          </ProfileWrapper>
        </UserProfileCardShadow>
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
