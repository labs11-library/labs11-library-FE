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
import Mapview from "./components/Mapview";

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
        <Route exact path="/inventory" component={InventoryList} />
        <Route exact path="/checkedout" component={CheckedOutList} />
        <Route exact path="/mapview" component={Mapview} />
      </div>
    );
  }
}

export default App;
