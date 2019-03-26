import React, { Component } from "react";
import { Route } from "react-router-dom";

import BookList from "./components/BookList";
import Users from "./components/Users";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {};

  render() {
    console.log(this.state);
    return (
      <div>
        <NavBar />
        <Route exact path="/books" component={BookList} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={UserProfile} />
      </div>
    );
  }
}

export default App;
