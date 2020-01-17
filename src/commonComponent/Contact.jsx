import React, { useState } from "react";
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
  TextField,
  InputAdornment
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import ForumIcon from "@material-ui/icons/Forum";
import { Warning, PermIdentity } from "@material-ui/icons";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import { last, get } from "lodash";
import Messages from "../Chat/messages/Messages";

function Contact({ contact, classes, addChat, chat, user, activeChat }) {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [alert, setAlert] = useState(false);

  const openChat = () => {
    setChatVisibility(true);
    addChat(contact.username);
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
        // key={contact.id}
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
        <ListItemText
          primary={contact.username}
          secondary={get(last(chat.messages), "message", "")}
        />
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
            <Typography className={classes.username}>Discussion</Typography>
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
            messages={activeChat.messages}
            user={user}
            typingUsers={activeChat.typingUsers}
          />
        </CardContent>
        <TextField
          // error={isError}
          // helperText={helperText}
          // value={value}
          // onChange={onChange}
          id="input-with-icon-textfield"
          label="Ecrire un message"
          fullWidth
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendIcon style={{ cursor: "pointer" }} />
              </InputAdornment>
            )
          }}
        />
      </Card>
    </>
  );
}

export default Contact;
