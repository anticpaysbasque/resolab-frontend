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

function Contact({
  receiver,
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
      await addChat(receiver.name, receiver.id);
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
          paddingBottom: "0px"
        }}
        onClick={openChat}
        button
      >
        <ListItemAvatar>
          <AccountCircleIcon />
        </ListItemAvatar>
        <ListItemText primary={receiver.name} secondary={lastMessage} />
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
              {`Discussion avec ${receiver.name}`}
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
          sendMessage={message =>
            sendMessage(activeChat.id, receiver.name, receiver.id, message)
          }
          sendTyping={isTyping => sendTyping(activeChat.id, isTyping)}
        />
      </Card>
    </>
  );
}

export default Contact;
