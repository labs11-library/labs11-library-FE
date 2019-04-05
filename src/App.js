import React, { Component } from "react";
import { Route } from "react-router-dom";
import queryString from "query-string";
import { withRouter } from "react-router";

import BookList from "./components/Books/BookList";
import Users from "./components/Users/Users";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import NavBar from "./components/Layout/NavBar";
import ChatApp from "./components/Chat/ChatApp";
import SingleInventoryWrapper from "./components/Inventory/SingleInventoryWrapper.js";
import SingleBook from "./components/Books/SingleBook";
import SingleCheckedOutBook from "./components/CheckedOut/SingleCheckedOutBook";
import Sendgrid from "./components/Email/SendGrid";
import ReviewForm from "./components/Reviews/ReviewForm";
import Payment from "./components/Stripe/Payment";
import MyLibrary from "./components/Profile/MyLibrary";
import LandingPage from "./components/Layout/LandingPage";
import RequestList from "./components/Requests/RequestList";
import BookSearch from "./components/AddBook/BookSearch.js";
import UserProfile from "./components/Profile/UserProfile";
import SingleRequest from "./components/Requests/SingleRequest.js";
import LibraryList from "./components/ViewLibraries/LibraryList";

class App extends Component {
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
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/books" component={BookList} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/my-library" component={MyLibrary} />
        <Route exact path="/review-form" component={ReviewForm} />
        <Route exact path="/payment" component={Payment} />
        <Route
          exact
          path="/users/:userId/checkedOut/:checkedOutId"
          render={props => <SingleCheckedOutBook {...props} />}
        />
        <Route
          path="/my-library/my-books/:bookId"
          render={props => <SingleInventoryWrapper {...props} />}
        />
        <Route exact path="/sendgrid" component={Sendgrid} />
        <Route
          exact
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
        <Route
          exact
          path="/notifications"
          render={props => <RequestList {...props} />}
        />
        <Route
          exact
          path="/add-book"
          render={props => <BookSearch {...props} />}
        />
        <Route
          exact
          path="/my-library/checkouts/:checkoutId"
          render={props => <SingleCheckedOutBook {...props} />}
        />
        <Route
          exact
          path="/profile"
          render={props => <UserProfile {...props} />}
        />

        <Route
          exact
          path="/notifications/:checkoutRequestId"
          render={props => <SingleRequest {...props} />}
        />
        <Route
          exact
          path="/users/:userId/library"
          render={props => <LibraryList {...props} />}
        />
        {/* <Route
          exact
          path="/users/:userId/library/:bookId"
          render={props => <SingleLibraryDetails {...props} />}
        /> */}
      </div>
    );
  }
}

export default withRouter(App);
