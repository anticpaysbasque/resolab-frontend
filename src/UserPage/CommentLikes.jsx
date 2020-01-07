import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  Divider,
  Typography,
  CardActions,
  IconButton
} from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { connect } from "react-redux";

import apiCallAuth from "../apiCallAuth";

const useStyles = makeStyles(theme => ({
  inline: {
    display: "inline"
  }
}));

function CommentLikes({ commentId, userId }) {
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    apiCallAuth
      .get(`/likes?comment.id=${commentId}`)
      .then(res => {
        const data = res.data;
        setLikes(data);
        setLikesCount(data.length);
        data.some(like => like.user.id === userId) && setIsLiked(true);
      })
      .catch(err => console.log("error fetching likes", err));
  }, [isLiked]);

  const handleLike = () => {
    if (isLiked) {
      const userLike = likes.find(like => like.user.id === userId);
      apiCallAuth
        .delete(`/likes/${userLike.id}`)
        .then(res => {
          setLikesCount(likesCount - 1);
          setIsLiked(false);
        })
        .catch(err => console.log("error", err));
    } else {
      apiCallAuth
        .post("/likes", {
          user: `api/users/${userId}`,
          comment: `api/comments/${commentId}`
        })
        .then(res => {
          setIsLiked(true);
          setLikesCount(likesCount + 1);
        })
        .catch(err => console.log("error", err));
    }
  };
  return (
    <>
      <IconButton aria-label="j'aime le commentaire" onClick={handleLike}>
        {isLiked ? (
          <Favorite color="secondary" />
        ) : (
          <FavoriteBorder color="disabled" />
        )}
      </IconButton>
      {likesCount}
    </>
  );
}

const mapstateToProps = state => {
  return {
    userId: state.userReducer.id
  };
};

export default connect(mapstateToProps)(CommentLikes);
