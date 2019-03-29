import React, { Component } from "react";
import { Route } from "react-router-dom";
import queryString from "query-string";
import { withRouter } from "react-router";

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
<<<<<<< HEAD
import SingleBook from "./components/SingleBook";
import Sendgrid from "./components/SendGrid";
=======
import SingleInventory from "./components/SingleInventory"
>>>>>>> ab2880f62d14b874d6dbcd34f682d4be4c38d19b

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
		if (query.token) {
			window.localStorage.setItem("jwt", query.token);
			this.props.history.push("/");
		}
	}

<<<<<<< HEAD
	render() {
		console.log(this.state);
		return (
			<div>
				<NavBar />
				<a href="http://localhost:9001/auth/logout">Logout</a>
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
				<Route exact path="/sendgrid" component={Sendgrid} />
				<Route exact path="/book/1" component={SingleBook} />
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
=======
  render() {
    console.log(this.state);
    return (
      <div>
        <NavBar />
        <a href="http://localhost:9001/auth/logout">Logout</a>
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
          path="/users/:userId/inventory/:bookId" 
          render={props => (
            <SingleInventory {...props} />
          )}
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
>>>>>>> ab2880f62d14b874d6dbcd34f682d4be4c38d19b
}

export default withRouter(App);
