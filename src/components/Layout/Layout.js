import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNECTED, LOGOUT } from "./Events.js";
import LoginForm from "./LoginForm.js";

const socketUrl = "http://localhost:9001/";

export default class Layout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			socket: null,
			user: null
		};
	}

	componentWillMount() {
		this.initSocket();
	}

	initSocket = () => {
		const socket = io(socketUrl);
		socket.on("connect", () => {
			console.log("Connected!");
		});
		this.setState({ socket });
	};

	setUser = user => {
		const { socket } = this.state;
		socket.emit(USER_CONNECTED, user);
		this.setState({ user });
		this.setState({ socket });
	};

	logout = () => {
		const { socket } = this.state;
		socket.emit(LOGOUT);
		this.setState({ user: null });
	};

	render() {
		const { socket, user } = this.state;
		return (
			<div>
				<h2>Hello World</h2>
				<LoginForm socket={socket} setUser={this.setUser} />
			</div>
		);
	}
}
