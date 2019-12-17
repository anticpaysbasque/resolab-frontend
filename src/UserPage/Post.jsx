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
import { connect } from "react-redux";

import apiCallAuth from "../apiCallAuth";
import CommentInput from "./CommentInput";

function Post({ description, photo, classes, handleSnackBar, postId, userId }) {
  const [inputCommentPost, setInputComment] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handlePostComment = () => {
    if (inputValue === "") {
      setIsInputEmpty(true);
    } else {
      apiCallAuth
        .post("/comments", {
          content: inputValue,
          date: new Date().toISOString(),
          post: `/api/posts/${postId}`,
          user: `api/users/${userId}`
        })
        .then(res => {
          handleInputComment();
          return handleSnackBar();
        })
        .catch(err => console.log(err));
    }
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
          isError={isInputEmpty}
          helperText={isInputEmpty ? "Entre un commentaire" : null}
          value={inputValue}
          onChange={handleInputChange}
          inputComment={handlePostComment}
          id={postId}
        />
      ) : (
        false
      )}
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id
  };
};

export default connect(mapStateToProps)(Post);
