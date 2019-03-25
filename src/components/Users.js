import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios
      .get("https://book-maps.herokuapp.com/users")
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.users.map(user => (
          <>
            <p>{user.firstName}</p>
            <img alt={user.firstName} src={user.picture} />
          </>
        ))}
      </div>
    );
  }
}

export default Users;
