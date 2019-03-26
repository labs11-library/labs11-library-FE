import React, { Component } from "react";
import { Route } from "react-router-dom";

import BookList from "./components/BookList";
import Users from "./components/Users";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import NavBar from "./components/NavBar";
import InventoryList from "./components/InventoryList";
import CheckedOutList from "./components/CheckedOutList";
<<<<<<< HEAD
import Mapview from "./components/Mapview";
=======
import ChatApp from "./components/ChatApp";
>>>>>>> 9e885f9982dc7f787774397e4d33805e926dac9c

class App extends Component {
  state = {
    username: "bob"
  };

  setUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <NavBar />
        <input
          onSubmit={this.setUsername}
          onChange={this.setUsername}
          value={this.state.username}
          placeholder="Search books"
        />
        <div>{this.state.username}</div>
        <Route exact path="/books" component={BookList} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/inventory" component={InventoryList} />
        <Route exact path="/checkedout" component={CheckedOutList} />
<<<<<<< HEAD
        <Route exact path="/mapview" component={Mapview} />
=======
        <Route
          exact
          path="/chatapp"
          render={props => (
            <ChatApp {...props} username={this.state.username} />
          )}
        />
>>>>>>> 9e885f9982dc7f787774397e4d33805e926dac9c
      </div>
    );
  }
}

export default App;
