import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  IconButton,
  Typography
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ForumIcon from "@material-ui/icons/Forum";
import { Warning } from "@material-ui/icons";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
// import { last, get } from "lodash";
import Messages from "../messages/Messages";
import MessageInput from "../messages/MessageInput";
import axios from "axios";
import { connect } from "react-redux";
import { orderBy, find } from "lodash";
import ChatRouter from "../messages/ChatRouter";

const chatUrl = process.env.REACT_APP_CHAT_URL;

function Contact({
  receiver,
  socketReceiver,
  classes,
  addChat,
  chat,
  user,
  activeChat,
  setActiveChat,
  sendTyping,
  sendMessage,
  token,
  connectedUsers
}) {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [alert, setAlert] = useState(false);
  const [userChat, setUserChat] = useState(chat[0]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [senderId, setSenderId] = useState(user.id);
  const [receiverId, setReceiverId] = useState(receiver.id);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    fetchDbMessages();
  }, [receiver, user]);

  useEffect(() => {
    console.log("chat update");
    setActiveChat(chat[0]);
    setUserChat(chat[0]);
  }, [chat[0]]);

  useEffect(() => {
    console.log("user connected");
    find(connectedUsers, { id: receiver.id })
      ? setIsOnline(true)
      : setIsOnline(false);
  }, [connectedUsers]);

  const fetchDbMessages = async () => {
    await axios
      .get(`${chatUrl}/userMessage/${senderId}/${receiverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      })
      .then(res => {
        setFetchedMessages(res.data);

        // setLastMessage(
        //     messagesFormated.message !== undefined
        //         ? messagesFormated[
        //               messagesFormated &&
        //                   messagesFormated.length - 1
        //           ].message
        //         : ""
        // );
      });
  };

  const openChat = async () => {
    if (userChat === undefined) {
      console.log("create chat");
      isOnline && (await addChat(socketReceiver.name, socketReceiver.id));
      setChatVisibility(true);
    } else {
      console.log("switch to chat");
      setChatVisibility(true);
      isOnline && setActiveChat(chat[0]);
      isOnline && setUserChat(chat[0]);
    }
    setIsNewMessage(false);
  };

  const closeChat = () => {
    setChatVisibility(false);
  };

  const handleClickAlert = () => {
    setAlert(!alert);
  };

  return (
    <>
      <ListItem
        style={{
          paddingTop: "0px",
          paddingBottom: "0px"
        }}
        onClick={openChat}
        button
      >
        <ListItemAvatar>
          <AccountCircleIcon style={isOnline ? { color: "lightgreen" } : {}} />
        </ListItemAvatar>
        <ListItemText primary={receiver.username} secondary={lastMessage} />
      </ListItem>

      <Card
        className={
          chatVisibility
            ? classes.chatWindowVisible
            : classes.chatWindowNoVisible
        }
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <ForumIcon />
            </Avatar>
          }
          title={
            <Typography className={classes.username}>
              {`Discussion avec ${receiver.username}`}
            </Typography>
          }
          action={
            <>
              <IconButton aria-label="alert">
                {alert ? (
                  <Warning color="secondary" onClick={handleClickAlert} />
                ) : (
                  <Warning color="disabled" onClick={handleClickAlert} />
                )}
              </IconButton>
              <IconButton aria-label="alert">
                <RemoveOutlinedIcon onClick={closeChat} />
              </IconButton>
            </>
          }
        />
        <ChatRouter
          messages={activeChat && activeChat.messages}
          user={user}
          socketReceiver={socketReceiver}
          typingUsers={activeChat && activeChat.typingUsers}
          sendMessage={message =>
            sendMessage(
              activeChat.id,
              socketReceiver.name,
              socketReceiver.id,
              message
            )
          }
          sendTyping={isTyping => sendTyping(activeChat.id, isTyping)}
          fetchedMessages={fetchedMessages}
          isOnline={isOnline}
          activeChat={activeChat}
          receiver={receiver}
          fetchDb={fetchDbMessages}
        />
      </Card>
    </>
  );
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    connectedUsers: state.connectedUsersReducer.connectedUsers
  };
};

export default connect(mapStateToProps)(Contact);
