import React, { Component } from "react";
import { TextField, Grid } from "@material-ui/core";
import { EmojiEmotions } from "@material-ui/icons";

import EmojiPicker from "./EmojiPicker";

export default class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      isTyping: false,
      isEmojiOpen: false
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
  addEmoji = e => {
    let emoji = e.native;
    this.setState({
      message: this.state.message + emoji
    });
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
    const { message, isEmojiOpen } = this.state;
    return (
      <div className="message-input" style={{ padding: "0px 15 px" }}>
        <Grid container>
          <Grid item xs={11}>
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
          </Grid>
          <Grid item xs={1}>
            <EmojiEmotions
              color="primary"
              onClick={() =>
                this.setState({
                  isEmojiOpen: !this.state.isEmojiOpen
                })
              }
            />
            {isEmojiOpen && <EmojiPicker addEmoji={e => this.addEmoji(e)} />}
          </Grid>
        </Grid>
      </div>
    );
  }
}
