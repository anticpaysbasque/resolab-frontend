import React, { useState, useEffect } from "react";
import {
  Warning,
  PermIdentity,
  ChatBubbleOutline,
  LinkedCameraSharp
  //  FavoriteBorder
} from "@material-ui/icons";
import Send from "@material-ui/icons/Send";
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
    // likes.map(like => {
    //     if (like.user.id === userId) {
    //         setIsLiked(true);
    //     }
    // });

    stateLikes.some(like => like.user.id === userId) && setIsLiked(true);
  }, []);

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
      const pireExempleDuMonde = stateLikes.find(like => {
        if (typeof like.user === "string") {
          return like.user.split("/")[3] === userId;
        } else {
          return userId === like.user.id;
        }
      });
      if (pireExempleDuMonde) {
        axios
          .delete(
            `http://localhost:8089/api/likes/${pireExempleDuMonde.id}`,
            config
          )
          .then(() =>
            axios.get(`http://localhost:8089/api/posts/${postId}/likes`, config)
          )
          .then(res => {
            setStateLikes(res.data);
            setIsLiked(false);
            setLikesCount(res.data.length);
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
          axios.get(`http://localhost:8089/api/posts/${postId}/likes`, config)
        )
        .then(res => {
          setStateLikes(res.data);
          setIsLiked(true);
          setLikesCount(likesCount + 1);
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

  // useEffect(() => {
  //     Axios.get(`http://localhost:8089${ownerId}`, {
  //         headers: {
  //             Authorization: "Bearer " + sessionStorage.getItem("token"),
  //             Accept: "application/json"
  //         }
  //     })
  //         .then(res => {
  //             setPostOwnerInfo(res.data);
  //         })
  //         .catch(err => console.log(err));
  // }, [ownerId]);
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
        <CardContent>
          {/* -------- TODO : insert mapping of the comments from props comment -------------- */}
        </CardContent>
        <Collapse Timeout="auto" unmountOnExit>
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
