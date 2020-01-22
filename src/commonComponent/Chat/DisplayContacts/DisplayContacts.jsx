import React, { Component } from "react";
import { differenceBy } from "lodash";
import axios from "axios";

// import { createChatNameFromUsers } from "../../../utils/websocketsFactories";
import Contact from "./Contact";

const apiUrl = process.env.REACT_APP_API_URL;

export default class DisplayContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reciever: "",
      allUsers: []
    };
  }

  componentDidMount() {
    console.log("Display contacts mounts");
    this.fetchUsers(1, []);
  }

  async fetchUsers(page, previousUsers) {
    // retreiving all users from database until there is no more post
    const nextPage = page + 1;
    await axios
      .get(`${apiUrl}/users?page=${page}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          Accept: "application/json"
        }
      })
      .then(async res => {
        const fetchedUsers = res.data;
        console.log("fetch ", fetchedUsers);
        let allFetchedUsers = previousUsers.concat(
          fetchedUsers.filter(user => user.id !== this.props.user.id)
        );
        console.log("new users ", allFetchedUsers);
        await axios
          .get(`${apiUrl}/users?page=${nextPage}`, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
              Accept: "application/json"
            }
          })
          .then(res => {
            if (res.data.length !== 0) {
              this.fetchUsers(nextPage, allFetchedUsers);
            } else {
              this.setState({ allUsers: allFetchedUsers });
            }
          });
      })

      .catch(err => console.log("error", err));
  }

  render() {
    const {
      chats,
      activeChat,
      user,
      setActiveChat,
      users,
      classes
    } = this.props;
    const { reciever, allUsers } = this.state;
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
          {allUsers &&
            allUsers.map(usr => {
              return (
                <Contact
                  activeChat={activeChat}
                  key={usr.id}
                  user={user}
                  receiver={usr}
                  socketReceiver={users.find(rcvr => rcvr.id === usr.id)}
                  classes={classes}
                  addChat={(receiverName, receiverId) =>
                    this.props.onSendPrivateMessage(receiverName, receiverId)
                  }
                  chat={chats.filter(chat => {
                    const user0 = chat.users[0];
                    const user1 = chat.users[1];
                    return (
                      (user0 === user.name && user1 === usr.username) ||
                      (user1 === user.name && user0 === usr.username)
                    );
                  })}
                  setActiveChat={chat => this.props.setActiveChat(chat)}
                  sendTyping={(chatId, isTyping) =>
                    this.props.sendTyping(chatId, isTyping)
                  }
                  sendMessage={(chatId, receiver, receiverId, message) =>
                    this.props.sendMessage(
                      chatId,
                      receiver,
                      receiverId,
                      message
                    )
                  }
                />
              );
            })}
        </div>
      </div>
    );
  }
}
