import React, { Component } from "react";
import { differenceBy } from "lodash";
// import { createChatNameFromUsers } from "../../../utils/websocketsFactories";
import Contact from "./Contact";
export default class DisplayContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reciever: ""
    };
  }

  // handlesubmit used for search field

  handleSubmit = e => {
    e.preventDefault();
    const { reciever } = this.state;
    const { onSendPrivateMessage } = this.props;
    onSendPrivateMessage(reciever);
    this.setState({ reciever: "" });
  };

  render() {
    const {
      chats,
      activeChat,
      user,
      setActiveChat,
      users,
      classes
    } = this.props;
    const { reciever } = this.state;
    return (
      <div id="side-bar">
        <form onSubmit={this.handleSubmit} className="search">
          <input
            placeholder="Search"
            type="text"
            value={reciever}
            onChange={e => {
              this.setState({ reciever: e.target.value });
            }}
          />
          <div className="plus"></div>
        </form>
        <div
          className="users"
          ref="users"
          onClick={e => {
            e.target === this.refs.user && setActiveChat(null);
          }}
        >
          {differenceBy(users, [user], "name").map(usr => {
            return (
              <Contact
                activeChat={activeChat}
                key={usr.id}
                user={user}
                receiver={usr}
                classes={classes}
                addChat={receiver => this.props.onSendPrivateMessage(receiver)}
                chat={chats.filter(
                  chat =>
                    (chat.users[0] === user.name &&
                      chat.users[1] === usr.name) ||
                    (chat.users[1] === user.name && chat.users[0] === usr.name)
                )}
                setActiveChat={chat => this.props.setActiveChat(chat)}
                sendTyping={(chatId, isTyping) =>
                  this.props.sendTyping(chatId, isTyping)
                }
                sendMessage={(chatId, message) =>
                  this.props.sendMessage(chatId, message)
                }
              />
            );
          })}
        </div>
      </div>
    );
  }
}
