import React, { Component } from "react";
import Chat from "twilio-chat";
import { Chat as ChatUI } from "@progress/kendo-react-conversational-ui";
import { connect } from "react-redux";
import { getLoggedInUser } from "../../redux/actions/authActions.js";

import Loading from "../Loading/Loading.js";
class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      messages: []
    };

    this.user = {
      id: props.user.userId,
      username: props.user.firstName
    };

    this.setupChatClient = this.setupChatClient.bind(this);
    this.messagesLoaded = this.messagesLoaded.bind(this);
    this.messageAdded = this.messageAdded.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.props.getLoggedInUser();
    fetch("https://book-maps.herokuapp.com/chat/token", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: `identity=${encodeURIComponent(this.props.user.firstName)}`
    })
      .then(res => res.json())
      .then(data => Chat.create(data.token))
      .then(this.setupChatClient)
      .catch(this.handleError);
  }
  getChannelName = () => {
    const userOne =
      this.props.user.userId > this.props.otherUserId
        ? this.props.user.userId
        : this.props.otherUserId;
    const userTwo =
      this.props.user.userId > this.props.otherUserId
        ? this.props.otherUserId
        : this.props.user.userId;
    return `${userOne}--${userTwo}`;
  };

  setupChatClient(client) {
    this.client = client;
    this.client
      .getChannelByUniqueName(this.getChannelName())
      .then(channel => channel)
      .catch(error => {
        if (error.body.code === 50300) {
          return this.client.createChannel({
            uniqueName: this.getChannelName()
          });
        } else {
          this.handleError(error);
        }
      })
      .then(channel => {
        this.channel = channel;
        return this.channel.join().catch(() => {});
      })
      .then(() => {
        // Success!
        this.setState({ isLoading: false });
        this.channel.getMessages().then(this.messagesLoaded);
        this.channel.on("messageAdded", this.messageAdded);
      })
      .catch(this.handleError);
  }

  handleError(error) {
    this.setState({
      error: "Could not load chat."
    });
  }

  twilioMessageToKendoMessage(message) {
    return {
      text: message.body,
      author: { id: message.author, name: message.author },
      timestamp: message.timestamp
    };
  }

  messagesLoaded(messagePage) {
    this.setState({
      messages: messagePage.items.map(this.twilioMessageToKendoMessage)
    });
  }

  messageAdded(message) {
    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        this.twilioMessageToKendoMessage(message)
      ]
    }));
  }

  sendMessage(event) {
    this.channel.sendMessage(event.message.text);
  }

  componentWillUnmount() {
    this.client.shutdown();
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (
      this.state.isLoading &&
      !this.props.user &&
      !this.props.otherUserId
    ) {
      return <Loading />;
    }
   
    return (
      <>
        <ChatUI
          user={this.user}
          messages={this.state.messages}
          onMessageSend={this.sendMessage}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.authReducer.loggedInUser
});

export default connect(
  mapStateToProps,
  { getLoggedInUser }
)(ChatApp);