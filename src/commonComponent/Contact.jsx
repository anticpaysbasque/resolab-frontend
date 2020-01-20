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
  Typography,
  Box,
  Grid
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ForumIcon from "@material-ui/icons/Forum";
import { Warning, PermIdentity } from "@material-ui/icons";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import { last, get } from "lodash";
import Messages from "../Chat/messages/Messages";
import MessageInput from "../Chat/messages/MessageInput";

function Contact({
  contact,
  classes,
  addChat,
  chat,
  user,
  activeChat,
  setActiveChat,
  sendTyping,
  sendMessage
}) {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [alert, setAlert] = useState(false);
  const [userChat, setUserChat] = useState(chat[0]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    console.log("chat update");
    setActiveChat(chat[0]);
    setUserChat(chat[0]);
  }, [chat[0]]);

  const openChat = async () => {
    console.log("chat", userChat);
    if (userChat === undefined) {
      console.log("create chat");
      await addChat(contact.name);
      setChatVisibility(true);
    } else {
      console.log("switch to chat");
      setChatVisibility(true);
      setActiveChat(chat[0]);
      setUserChat(chat[0]);
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
          paddingBottom: "0px",
          cursor: "pointer"
        }}
        onClick={openChat}
      >
        <ListItemAvatar>
          <AccountCircleIcon />
        </ListItemAvatar>
        <ListItemText primary={contact.name} secondary={lastMessage} />
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
              {`Discussion avec ${contact.name}`}
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

        <CardContent>
          <Messages
            messages={activeChat && activeChat.messages}
            user={user}
            typingUsers={activeChat && activeChat.typingUsers}
          />
        </CardContent>
        <MessageInput
          sendMessage={message => sendMessage(activeChat.id, message)}
          sendTyping={isTyping => sendTyping(activeChat.id, isTyping)}
        />
      </Card>
    </>
  );
}

export default Contact;
