import React, { Component } from "react";
import { Route } from "react-router-dom";
import queryString from "query-string";
import { withRouter } from "react-router";
import backendBaseUrl from "./url";

import BookList from "./components/BookList";
import Users from "./components/Users";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import NavBar from "./components/NavBar";
import InventoryList from "./components/InventoryList";
import CheckedOutList from "./components/CheckedOutList";
import Mapview from "./components/Mapview";
import ChatApp from "./components/ChatApp";
import SingleInventory from "./components/SingleInventory";
import SingleBook from "./components/SingleBook";
import SingleCheckedOutBook from "./components/SingleCheckedOutBook";
import BookSearch from "./components/AddBook/BookSearch";
import Sendgrid from "./components/SendGrid";

class App extends Component {
  state = {
    username: "bob"
  };

  setUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    console.log(query);
    if (query.token && query.userId) {
      window.localStorage.setItem("jwt", query.token);
      window.localStorage.setItem("userId", query.userId);
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <a href={`${backendBaseUrl}/auth/logout`}>Logout</a>
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
        <Route exact path="/mapview" component={Mapview} />
        <Route
          exact
          path="/users/:userId/checkedOut/:checkedOutId"
          render={props => <SingleCheckedOutBook {...props} />}
        />
        <Route
          path="/users/:userId/inventory/:bookId"
          render={props => <SingleInventory {...props} />}
        />
        <Route exact path="/sendgrid" component={Sendgrid} />
        <Route exact path="/add-book" component={BookSearch} />
        <Route
          path="/books/:bookId"
          render={props => <SingleBook {...props} />}
        />
        <Route
          exact
          path="/chatapp"
          render={props => (
            <ChatApp {...props} username={this.state.username} />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);