import React, { useState, useEffect } from "react";
import { Warning, PermIdentity, ChatBubbleOutline } from "@material-ui/icons";

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

import axios from "axios";

function Post({
  description,
  photo,
  classes,
  handleSnackBar,
  postId,
  userId,
  comments,
  likes,
  owner,
  token
}) {
  const [inputCommentPost, setInputComment] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [stateLikes, setStateLikes] = useState(likes);
  const [likesCount, setLikesCount] = useState(stateLikes.length);

  useEffect(() => {
    stateLikes.some(like => like.user.id === userId) && setIsLiked(true);
  }, []);


  useEffect(() => {
    setLikesCount(stateLikes.length);
  }, [stateLikes]);

  const handlePostComment = () => {
    if (inputValue === "") {
      setIsInputEmpty(true);
    } else {
      apiCallAuth
        .post("/comments", {
          content: inputValue,
          date: new Date().toISOString(),
          post: `/api/posts/${postId}`,
          user: `/api/users/${userId}`
        })
        .then(res => {
          handleInputComment();
          setInputValue("");
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

  const handleLike = () => {
    // Si c'est déjà liké, on supprime le like dans l'API, puis isLiked -> false, count -1
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    if (isLiked) {
      const foundLike = stateLikes.find(like => userId === like.user.id);
      if (foundLike) {
        axios
          .delete(`http://localhost:8089/api/likes/${foundLike.id}`, config)
          .then(() =>
            axios.get(`http://localhost:8089/api/posts/${postId}`, config)
          )
          .then(res => {
            setStateLikes(res.data.likes);
            setIsLiked(false);
          })
          .catch(err => {
            console.log(err.message);
            throw err;
          });
      } else {
        alert("Undefined !");
      }
    }

    // Si c'est pas liké, on crée le like dans l'API, puis isLiked -> true, count +1
    if (!isLiked) {
      axios
        .post(
          "http://localhost:8089/api/likes",
          {
            user: `api/users/${userId}`,
            post: `api/posts/${postId}`
          },
          config
        )
        .then(() =>
          axios.get(`http://localhost:8089/api/posts/${postId}`, config)
        )
        .then(res => {
          setStateLikes(res.data.likes);
          setIsLiked(true);
        })
        .catch(err => {
          console.log(err.message);
          throw err;
        });
    }
  };

  const handleClickAlert = () => {
    setAlert(!alert);
  };
  return (
    <Card className={classes.card}>
      <div className="scroll-post">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <PermIdentity />
            </Avatar>
          }
          title={owner.username}
          action={
            <IconButton aria-label="settings">
              <Warning />
            </IconButton>
          }
        />
        <CardMedia className={classes.media} image={photo} />
        <CardContent>
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {isLiked ? (
              <Favorite color="secondary" onClick={handleLike} />
            ) : (
              <FavoriteBorder color="disabled" onClick={handleLike} />
            )}
          </IconButton>
          {likesCount}
          <IconButton aria-label="add to favorites">
            <ChatBubbleOutline onClick={handleInputComment} />
          </IconButton>
        </CardActions>
        {inputCommentPost ? (
          <>
            <DisplayComments comments={comments} />
            <CommentInput
              isError={isInputEmpty}
              helperText={isInputEmpty ? "Entre un commentaire" : null}
              value={inputValue}
              onChange={handleInputChange}
              inputComment={handlePostComment}
              id={postId}
            />
          </>
        ) : (
          false
        )}
      </div>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id,
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(Post);
