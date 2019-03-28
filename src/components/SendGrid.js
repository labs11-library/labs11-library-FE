import React, { Component } from "react";

class Sendgrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: {
				recipient: "",
				sender: "",
				subject: "",
				text: ""
			}
		};
	}

	sendEmail = () => {
		const { email } = this.state;
		fetch(
			`http://localhost:9000/send-email?recipient=${email.recipient}&sender=${
				email.sender
			}&topic=${email.subject}&text=${email.text}`
		).catch(error => console.log(error));
	};

	render() {
		const { email } = this.state;
		const spacer = {
			margin: 10
		};
		const textArea = {
			broderRadius: 4
		};
		return (
			<div>
				<div style={{ marginTop: 10 }}>
					<h2> Send Email </h2>
					<label> Recipient </label>
					<br />
					<input
						value={email.recipient}
						onChange={e =>
							this.setState({ email: { ...email, recipient: e.target.value } })
						}
					/>
					<div style={spacer} />
					<label> Sender </label>
					<br />
					<input
						value={email.sender}
						onChange={e =>
							this.setState({ email: { ...email, sender: e.target.value } })
						}
					/>
					<div style={spacer} />
					<label> Subject </label>
					<br />
					<input
						value={email.subject}
						onChange={e =>
							this.setState({ email: { ...email, subject: e.target.value } })
						}
					/>
					<div style={spacer} />
					<label> Message </label>
					<br />
					<textarea
						rows={3}
						value={email.text}
						style={textArea}
						onChange={e =>
							this.setState({ email: { ...email, text: e.target.value } })
						}
					/>
					<div style={spacer} />
					<button onClick={this.sendEmail}> Send Email </button>
				</div>
			</div>
		);
	}
}

export default Sendgrid;
