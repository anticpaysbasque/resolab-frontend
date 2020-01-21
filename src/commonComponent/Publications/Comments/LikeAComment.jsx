import React, { useState, useEffect } from "react";

import { IconButton } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { connect } from "react-redux";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function CommentLikes({ commentId, userId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/likes?comment.id=${commentId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        const data = res.data;
        setLikes(data);
      })
      .catch(err => console.log("error fetching likes", err));
  }, []);

  useEffect(() => {
    likes.some(like => like.user.id === userId) && setIsLiked(true);
    setLikesCount(likes.length);
  }, [likes]);

  const handleLike = () => {
    if (isLiked) {
      const userLike = likes.find(like => like.user.id === userId);
      axios
        .delete(`${apiUrl}/likes/${userLike.id}`, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
            Accept: "application/json"
          }
        })
        .then(res => {
          axios
            .get(`${apiUrl}/likes?comment.id=${commentId}`, {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                Accept: "application/json"
              }
            })
            .then(res => {
              const data = res.data;
              setLikes(data);
              setIsLiked(false);
            })
            .finally(setIsButtonDisabled(false))
            .catch(err => console.log("error", err));
        })
        .catch(err => console.log("error", err));
    } else {
      axios
        .post(
          `${apiUrl}/likes`,
          {
            user: `api/users/${userId}`,
            comment: `api/comments/${commentId}`
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
              Accept: "application/json"
            }
          }
        )
        .then(res => {
          axios
            .get(`${apiUrl}/likes?comment.id=${commentId}`, {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                Accept: "application/json"
              }
            })
            .then(res => {
              const data = res.data;
              setLikes(data);
            })
            .finally(setIsButtonDisabled(false))
            .catch(err => console.log("error", err));
        })

        .catch(err => console.log("error", err));
    }
  };
  return (
    <>
      <IconButton
        aria-label="j'aime le commentaire"
        onClick={() => {
          handleLike();
          setIsButtonDisabled(true);
        }}
        disabled={isButtonDisabled}
      >
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
