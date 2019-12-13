import React, { useState } from "react";
import {
  Warning,
  PermIdentity,
  ChatBubbleOutline
  //  FavoriteBorder
} from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography
} from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";

import apiCallAuth from "../apiCallAuth";
import CommentInput from "./CommentInput";

export default function Post({ description, photo, classes, handleSnackBar }) {
  const [inputCommentPost, setInputComment] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handlePostComment = () => {
    handleSnackBar();
    handleInputComment(!inputCommentPost);
    // apiCallAuth
    //   .post("/comments", {
    //     commentUser: inputValue
    //   })
    //   .then(res => {
    //     handleInputComment(!inputCommentPost);
    //   })
    //   .catch(err => console.log(err));
  };

  const handleInputComment = () => {
    setInputComment(!inputCommentPost);
  };
  const handleInputChange = e => {
    setInputValue(e.target.value);
  };
  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <PermIdentity />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Warning />
          </IconButton>
        }
      />
      <CardMedia
        className={classes.media}
        image="https://placekitten.com/200/200"
      />
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {isLiked ? (
            <Favorite color="secondary" onClick={handleClick} />
          ) : (
            <FavoriteBorder color="disabled" onClick={handleClick} />
          )}
        </IconButton>
        <IconButton aria-label="add to favorites">
          <ChatBubbleOutline onClick={handleInputComment} />
        </IconButton>
      </CardActions>
      <Collapse timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
      {inputCommentPost ? (
        <CommentInput
          value={inputValue}
          onChange={handleInputChange}
          inputComment={handlePostComment}
        />
      ) : (
        false
      )}
    </Card>
  );
}
