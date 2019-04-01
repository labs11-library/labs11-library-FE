import React, { Component } from "react";

import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/userActions.js";

import Auth from "../Auth/Auth";
class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        {this.props.users.map(user => (
          <>
            <p>{user.firstName}</p>
            <img alt={user.firstName} src={user.picture} />
          </>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userReducer.users,
  loading: state.userReducer.loadingUsers
});

const UsersComponent = connect(
  mapStateToProps,
  { getUsers }
)(Users);

export default Auth(UsersComponent);
