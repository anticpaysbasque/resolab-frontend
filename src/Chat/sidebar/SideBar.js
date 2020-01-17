import React, { Component } from "react";
import SideBarOption from "./SideBarOption";
import { last, get, differenceBy } from "lodash";
import { createChatNameFromUsers } from "../../utils/websocketsFactories";
import Contact from "../../commonComponent/Contact";
export default class SideBar extends Component {
  static type = {
    USERS: "users",
    CHATS: "chats"
  };
  constructor(props) {
    super(props);
    this.state = {
      reciever: "",
      activeSideBar: SideBar.type.USERS
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { reciever } = this.state;
    const { onSendPrivateMessage } = this.props;

    onSendPrivateMessage(reciever);
    this.setState({ reciever: "" });
  };

  addChatForUser = reciever => {
    this.props.onSendPrivateMessage(reciever);
  };
  setActiveSideBar = type => {
    this.setState({ activeSideBar: type });
  };

  render() {
    const {
      chats,
      activeChat,
      user,
      setActiveChat,
      logout,
      users,
      classes
    } = this.props;
    const { reciever, activeSideBar } = this.state;
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
        {/* <div className="side-bar-select">
                    <div
                        onClick={() => {
                            this.setActiveSideBar(SideBar.type.CHATS);
                        }}
                        className={`side-bar-select__option ${
                            activeSideBar === SideBar.type.CHATS ? "active" : ""
                        }`}
                    >
                        <span>Chats</span>
                    </div>
                    <div
                        onClick={() => {
                            this.setActiveSideBar(SideBar.type.USERS);
                        }}
                        className={`side-bar-select__option ${
                            activeSideBar === SideBar.type.USERS ? "active" : ""
                        }`}
                    >
                        <span>Users</span>
                    </div>
                </div> */}
        <div
          className="users"
          ref="users"
          onClick={e => {
            e.target === this.refs.user && setActiveChat(null);
          }}
        >
          {activeSideBar === SideBar.type.CHATS
            ? chats.map(chat => {
                return (
                  <SideBarOption
                    key={chat.id}
                    lastMessage={get(last(chat.messages), "message", "")}
                    name={
                      chat.isCommunity
                        ? chat.name
                        : createChatNameFromUsers(chat.users, user.name)
                    }
                    active={activeChat.id === chat.id}
                    onClick={() => {
                      this.props.setActiveChat(chat);
                    }}
                  />
                );
              })
            : differenceBy(users, [user], "name").map(usr => {
                return (
                  <Contact
                    activeChat={activeChat}
                    key={usr.id}
                    user={user}
                    contact={{ username: usr.name }}
                    classes={classes}
                    addChat={this.addChatForUser}
                    chat={chats.filter(
                      chat =>
                        chat.users[0] === usr.name &&
                        chat.users[1] === user.name
                    )}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}
