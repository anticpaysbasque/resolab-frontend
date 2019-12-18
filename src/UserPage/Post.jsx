import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";

function Post({ description, photo, classes, handleSnackBar, userId }) {
  const [inputCommentPost, setInputComment] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await apiCallAuth.get("/likes?post.id=");

        for (let i = 0; i < res.data.length; i++) {
          // Find if the current authenticated user already liked the post
          const current = res.data[i];
          const spreadedId = current.user.split("/")[3];
          if (userId === spreadedId) setIsLiked(true);
        }
        setLikes(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchLikes();
  }, []);

  const addLike = async () => {
    try {
      // Post a like with Axios
      setIsLiked(true);
    } catch (err) {
      console.log(err.message);
    }
  };

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
            // TODO: Handle the dislike Feature
            <Favorite color="secondary" />
          ) : (
            <FavoriteBorder color="disabled" onClick={addLike} />
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

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id
  };
};

export default connect(mapStateToProps)(Post);
