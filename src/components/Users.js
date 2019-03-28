import React, { Component } from "react";

import { connect } from "react-redux";
import { getUsers } from "../redux/actions";

import Auth from "./Auth";
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
  users: state.users,
  loading: state.loading
});

const UsersComponent = connect(
  mapStateToProps,
  { getUsers }
)(Users);

export default Auth(UsersComponent);
