import React, { Component } from "react";
import { TextField } from "@material-ui/core";

export default class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      isTyping: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.sendMessage();
    this.setState({ message: "" });
  };

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
  };

  componentWillUnmount() {
    this.stopCheckingTyping();
  }

  sendTyping = () => {
    this.lastUpdateTime = Date.now();
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
      this.props.sendTyping(true);
      this.startCheckingTyping();
    }
  };

  /*
   *	startCheckingTyping
   *	Start an interval that checks if the user is typing.
   */
  startCheckingTyping = () => {
    this.typingInterval = setInterval(() => {
      if (Date.now() - this.lastUpdateTime > 300) {
        this.setState({ isTyping: false });
        this.stopCheckingTyping();
      }
    }, 300);
  };

  /*
   *	stopCheckingTyping
   *	Start the interval from checking if the user is typing.
   */
  stopCheckingTyping = () => {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.props.sendTyping(false);
    }
  };

  render() {
    const { message } = this.state;
    return (
      <div className="message-input" style={{ padding: "0px 15 px" }}>
        <form
          onSubmit={this.handleSubmit}
          className="message-form"
          style={{ margin: "3px" }}
        >
          <TextField
            id="message"
            fullWidth
            ref={"messageinput"}
            variant="outlined"
            value={message}
            placeholder="Saisir le message"
            onKeyUp={e => {
              e.keyCode !== 13 && this.sendTyping();
            }}
            onChange={({ target }) => {
              this.setState({ message: target.value });
            }}
            style={{ height: "20px" }}
          />
        </form>
      </div>
    );
  }
}
