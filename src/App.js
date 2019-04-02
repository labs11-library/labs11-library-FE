import React, { Component } from "react";
import { Route } from "react-router-dom";
import queryString from "query-string";
import { withRouter } from "react-router";
import backendBaseUrl from "./url";

import BookList from "./components/Books/BookList";
import Users from "./components/Users/Users";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import UserProfile from "./components/Profile/UserProfile";
import NavBar from "./components/Layout/NavBar";
import InventoryList from "./components/Inventory/InventoryList";
import CheckedOutList from "./components/CheckedOut/CheckedOutList";
import Mapview from "./components/Map/Mapview";
import ChatApp from "./components/Chat/ChatApp";
import SingleInventoryWrapper from "./components/Inventory/SingleInventoryWrapper.js";
import SingleBook from "./components/Books/SingleBook";
import SingleCheckedOutBook from "./components/CheckedOut/SingleCheckedOutBook";
import BookSearch from "./components/AddBook/BookSearch";
import Sendgrid from "./components/Email/SendGrid";
import ReviewForm from "./components/Reviews/ReviewForm";
import Payment from "./components/Stripe/Payment";

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
        <Route exact path="/review-form" component={ReviewForm} />
        <Route exact path="/payment" component={Payment} />
        <Route
          exact
          path="/users/:userId/checkedOut/:checkedOutId"
          render={props => <SingleCheckedOutBook {...props} />}
        />
        <Route
          path="/users/:userId/inventory/:bookId"
          render={props => <SingleInventoryWrapper {...props} />}
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
