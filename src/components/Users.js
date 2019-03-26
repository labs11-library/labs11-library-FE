import React, { Component } from "react";

import { connect } from "react-redux";
import { getUsers } from "../redux/actions";
class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    console.log(this.state);
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

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
