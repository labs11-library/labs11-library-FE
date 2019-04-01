import React, { Component } from "react";
import Chat from "twilio-chat";
import { Chat as ChatUI } from "@progress/kendo-react-conversational-ui";
import { connect } from "react-redux";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
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
    }

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
        body: `identity=${encodeURIComponent(this.user.username)}`
      })
        .then(res => res.json())
        .then(data => Chat.create(data.token))
        .then(this.setupChatClient)
        .catch(this.handleError);
  }
  
  getChannelName = () => {
    const userOne = this.props.user.userId > this.props.otherUserId ? this.props.user.userId : this.props.otherUserId
    const userTwo = this.props.user.userId > this.props.otherUserId ? this.props.otherUserId : this.props.user.userId
    console.log(`${userOne}-${userTwo}`)
    return `${userOne}-${userTwo}`
  }

  setupChatClient(client) {
    this.client = client;
    this.client
      .getChannelByUniqueName(this.getChannelName())
      .then(channel => channel)
      .catch(error => {
        if (error.body.code === 50300) {
          return this.client.createChannel({ uniqueName: this.getChannelName() });
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
    console.error(error);
    this.setState({
      error: "Could not load chat."
    });
  }

  twilioMessageToKendoMessage(message) {
    console.log("twilioMessageToKendoMessage", message)
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
    console.log("loggedinuser", this.props.user)
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.isLoading) {
      return <p>Loading chat...</p>;
    }
    return (
      <ChatUI
        user={this.user}
        messages={this.state.messages}
        onMessageSend={this.sendMessage}
        width={500}
      />
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
