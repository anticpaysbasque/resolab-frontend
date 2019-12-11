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
  TextField,
  InputAdornment
} from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import Axios from "axios";

import CommentInput from "./CommentInput";

import { useStyles } from "./useStyles";

export default function RecipeReviewCard() {
  const [datas, setDatas] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [inputCommentPost, setInputComment] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const classes = useStyles();

  // useEffect(() => {
  //   const fetchDatas = async () => {
  //     const res = await Axios.get();
  //     setDatas(res.data);
  //   };
  //   fetchDatas();
  // }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    setIsLiked(!isLiked);
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
      <CardMedia className={classes.media} />
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
      {inputCommentPost ? (
        <CommentInput
          value={inputValue}
          onChange={handleInputChange}
          inputComment={handleInputComment}
        />
      ) : (
        false
      )}
    </Card>
  );
}
